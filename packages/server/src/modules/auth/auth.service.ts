import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { User } from '@prisma/client';
import * as argon2 from 'argon2';

import { LoginRequestDto } from './dto/login-request.dto';
import { SignupRequestDto } from './dto/signup-request.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async signup(dto: SignupRequestDto) {
    const user = await this.usersService.getUserByUsername(dto.username);
    if (user) throw new BadRequestException('User already exists');
    const hashedPassword = await this.hashData(dto.password);
    return this.usersService.createUser(dto.username, hashedPassword, dto.role);
  }

  async login(dto: LoginRequestDto) {
    const user = await this.usersService.getUserByUsernameOrThrow(dto.username);
    const isPasswordMatches = await this.compareData(
      user.password,
      dto.password,
    );
    if (!isPasswordMatches) throw new UnauthorizedException('Invalid password');
    const token = await this.generateToken(user.id, user.username, user.role);
    return token;
  }

  private async hashData(data: string) {
    return await argon2.hash(data);
  }

  private async compareData(hashedData: string, data: string) {
    return await argon2.verify(hashedData, data);
  }

  async generateToken(userId: number, username: string, role: User['role']) {
    const token = await this.jwtService.signAsync(
      { userId, username, role },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN.SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN.DURATION'),
      },
    );

    return token;
  }

  async verifyToken(token: string) {
    const decoded: { userId: number; username: string; role: User['role'] } =
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('ACCESS_TOKEN.SECRET'),
      });

    return decoded;
  }
}
