import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findUserByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async createUser(username: string, password: string, role: User['role']) {
    return await this.prisma.user.create({
      data: {
        username,
        password,
        role,
      },
    });
  }
}
