import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupRequestDto } from './dto/signup-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import * as argon2 from 'argon2';
import { UsersRepository } from '../users/users.repository';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async signup(dto: SignupRequestDto) {
    const hashedPassword = await this.hashData(dto.password);
    const userEntity = dto.toUserEntity(hashedPassword);
    return this.usersRepository.createUser(userEntity);
  }

  async login(dto: LoginRequestDto) {
    const userEntity = await this.usersRepository.getUserByUsername(
      dto.username,
    );
    if (!userEntity) throw new NotFoundException('User not found');
    const isPasswordMatches = await this.compareData(
      userEntity.password,
      dto.password,
    );
    if (!isPasswordMatches) throw new UnauthorizedException('Invalid password');

    const token = await this.generateToken(userEntity);

    return token;
  }

  private async hashData(data: string) {
    return await argon2.hash(data);
  }

  private async compareData(hashedData: string, data: string) {
    return await argon2.verify(hashedData, data);
  }

  private async generateToken(userEntity: UserEntity) {
    const { id, username } = userEntity;
    const token = await this.jwtService.signAsync(
      { sub: id, username },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN.SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN.DURATION'),
      },
    );

    return token;
  }

  async verifyToken(token: string) {
    const decoded: { sub: string; username: string } =
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('ACCESS_TOKEN.SECRET'),
      });

    return decoded;
  }
}
