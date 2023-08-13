import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return null;
    return new UserEntity(
      user.id,
      user.username,
      user.password,
      user.role,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findUserByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) return null;
    return new UserEntity(
      user.id,
      user.username,
      user.password,
      user.role,
      user.createdAt,
      user.updatedAt,
    );
  }

  async createUser(userEntity: UserEntity) {
    const { username, password, role } = userEntity;
    const user = await this.prisma.user.create({
      data: {
        username,
        password,
        role,
      },
    });
    return new UserEntity(
      user.id,
      user.username,
      user.password,
      user.role,
      user.createdAt,
      user.updatedAt,
    );
  }
}
