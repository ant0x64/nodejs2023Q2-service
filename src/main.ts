import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from 'app.module';
import { LoggingService } from 'logging/logging.service';

import { enableSwagger } from 'swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  enableSwagger(app);

  const logger = await app.resolve(LoggingService);
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
