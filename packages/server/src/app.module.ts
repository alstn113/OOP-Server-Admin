import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    PrismaModule,
    // main modules
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
