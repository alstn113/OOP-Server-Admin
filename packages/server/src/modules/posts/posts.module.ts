import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  imports: [PrismaService, UsersService],
})
export class PostsModule {}
