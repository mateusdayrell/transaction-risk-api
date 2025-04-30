import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger)); // Use the Logger service for logging
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // Automatically strip properties that do not have decorators
  app.use(cookieParser()); // Parse cookies from the request
  await app.listen(app.get(ConfigService).getOrThrow('PORT'));
}
bootstrap();
