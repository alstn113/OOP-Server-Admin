import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupRequestDto } from './dto/signup-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import * as argon2 from 'argon2';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

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

    return userEntity;
    //TODO: access token은 header
    //TODO: refresh token은 cookie
  }

  async logout() {
    return;
  }

  private async hashData(data: string) {
    return await argon2.hash(data);
  }

  private async compareData(hashedData: string, data: string) {
    return await argon2.verify(hashedData, data);
  }
}
