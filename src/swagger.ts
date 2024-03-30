import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const enableSwagger = (app: INestApplication): void => {
  SwaggerModule.setup(
    'doc',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .addServer('/')
        .setTitle('Home music library service')
        .build(),
    ),
  );
};
