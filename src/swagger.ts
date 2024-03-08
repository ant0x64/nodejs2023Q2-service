import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const enableSwagger = (app: INestApplication) => {
  return SwaggerModule.setup(
    'doc',
    app,
    SwaggerModule.createDocument(app, new DocumentBuilder().build()),
  );
};

export default enableSwagger;
