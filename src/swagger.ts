import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const enableSwagger = (app: INestApplication) => {
  return SwaggerModule.setup(
    'doc',
    app,
    SwaggerModule.createDocument(app, new DocumentBuilder().build()),
  );
};
