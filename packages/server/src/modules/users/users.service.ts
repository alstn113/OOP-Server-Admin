import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserByIdOrThrow(userId: number) {
    const userEntity = await this.usersRepository.findUserById(userId);
    if (!userEntity)
      throw new NotFoundException(`User with id ${userId} not found`);
    return userEntity;
  }

  async getUserByUsernameOrThrow(username: string) {
    const userEntity = await this.usersRepository.findUserByUsername(username);
    if (!userEntity)
      throw new NotFoundException(`User with username ${username} not found`);
    return userEntity;
  }

  async createUser(userEntity: UserEntity) {
    return await this.usersRepository.createUser(userEntity);
  }
}
