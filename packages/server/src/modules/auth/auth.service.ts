import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupRequestDto } from './dto/signup-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
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
    dto.password = hashedPassword;
    return this.usersService.createUser(dto.username, dto.password, dto.role);
  }

  async login(dto: LoginRequestDto) {
    const user = await this.usersService.getUserByUsernameOrThrow(dto.username);
    const isPasswordMatches = await this.compareData(
      user.password,
      dto.password,
    );
    if (!isPasswordMatches) throw new UnauthorizedException('Invalid password');

    const token = await this.generateToken(user.id, user.username);

    return token;
  }

  private async hashData(data: string) {
    return await argon2.hash(data);
  }

  private async compareData(hashedData: string, data: string) {
    return await argon2.verify(hashedData, data);
  }

  async generateToken(userId: number, username: string) {
    const token = await this.jwtService.signAsync(
      { userId, username },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN.SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN.DURATION'),
      },
    );

    return token;
  }

  async verifyToken(token: string) {
    const decoded: { userId: number; username: string } =
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('ACCESS_TOKEN.SECRET'),
      });

    return decoded;
  }
}
