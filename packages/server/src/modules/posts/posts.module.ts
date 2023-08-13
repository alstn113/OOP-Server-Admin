import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';

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
