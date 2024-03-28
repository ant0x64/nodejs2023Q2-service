import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from 'app.module';

import { enableSwagger } from 'swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  enableSwagger(app);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
