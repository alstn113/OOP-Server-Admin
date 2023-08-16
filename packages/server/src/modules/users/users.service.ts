import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@prisma/client';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserByIdOrThrow(userId: number) {
    const user = await this.usersRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }

  async getUserByUsernameOrThrow(username: string) {
    const user = await this.usersRepository.findUserByUsername(username);

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async getUserByUsername(username: string) {
    return await this.usersRepository.findUserByUsername(username);
  }

  async createUser(username: string, password: string, role: User['role']) {
    return await this.usersRepository.createUser(username, password, role);
  }
}
