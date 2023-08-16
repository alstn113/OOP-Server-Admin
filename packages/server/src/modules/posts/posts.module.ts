import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [PostsController],
  providers: [
    JwtService,
    PrismaService,
    PostsService,
    PostsRepository,
    UsersRepository,
    UsersService,
  ],
  imports: [],
})
export class PostsModule {}
