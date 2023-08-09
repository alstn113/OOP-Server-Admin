import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  const FRONTEND_URL = configService.get<string>('FRONTEND_URL');

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: FRONTEND_URL,
    credentials: true,
  });

  // pipe는 요청을 가공, 검증
  // intercept는 응답을 가공, 변경

  // 응답 객체 직렬화 class -> json
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // 요청 객체 역직렬화 json -> class
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 유효성 검사에서 정의되지 않은 속성을 자동으로 제거합니다.
      transform: true, // 요청 데이터를 지정된 타입으로 자동 변환합니다.
    }),
  );

  app.enableShutdownHooks();
  await app.listen(PORT);
};

bootstrap();
