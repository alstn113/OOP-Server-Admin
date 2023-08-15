import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import {
  AuthModule,
  UsersModule,
  PostsModule,
  CommentsModule,
} from './modules';
import { EnvConfig, JwtConfig } from './config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig, JwtConfig],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    JwtModule.register({}),
    PrismaModule,
    // main modules
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  static PORT: number;
  static API_PREFIX: string;
  static FRONTEND_URL: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.PORT = this.configService.get<number>('PORT');
    AppModule.API_PREFIX = this.configService.get<string>('API_PREFIX');
    AppModule.FRONTEND_URL = this.configService.get<string>('FRONTEND_URL');
  }
}
