import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import '@infra/config/env';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initSwagger } from '@infra/config/docs/init-swagger';
import { ValidationPipe } from '@nestjs/common';
import { Env } from '@infra/config/env';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useBodyParser('json', { limit: '10mb' });
  app.useBodyParser('urlencoded', { extended: true, limit: '10mb' });

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  initSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters();

  await app.listen(Env.node.port);

  console.log(`🚀 Server running on: http://localhost:${Env.node.port}`);
}

bootstrap();
