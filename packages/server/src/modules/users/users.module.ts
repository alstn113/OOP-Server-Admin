import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
