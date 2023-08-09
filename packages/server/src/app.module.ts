import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
      load: [configuration],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
