import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { LoggingService } from './logging.service';

import { IncomingMessage, ServerResponse } from 'http';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: LoggingService) {
    this.logger.setContext(this.constructor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<IncomingMessage>();
    const response = context.switchToHttp().getResponse<ServerResponse>();

    request.headers['x-intercepted'] = 'true';

    this.logger.log(
      'Incomming Request: ' +
        JSON.stringify({
          controller: context.getClass()?.name,
          method: request.method,
          url: request.url,
          params: request['params'] || '',
          body: request['body'] || '',
        }),
    );

    response.once('finish', () => {
      this.logger.log(
        'Server Responce: ' +
          JSON.stringify({
            status: response.statusCode,
            message: response.statusMessage,
          }),
      );
    });

    return next.handle().pipe();
  }
}
