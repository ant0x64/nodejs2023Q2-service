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

    let requestData = '';
    request.on('data', (chunk) => {
      requestData += chunk.toString();
    });

    request.once('end', () => {
      this.logger.log(
        'Incomming Request: ' +
          JSON.stringify({
            controller: context.getClass()?.name,
            method: request.method,
            url: request.url,
            params: request['params'] || '',
            body: requestData,
          }),
      );
    });

    response.once('finish', () => {
      setImmediate(() => {
        this.logger.log(
          'Server Responce: ' +
            JSON.stringify({
              status: response.statusCode,
              message: response.statusMessage,
            }),
        );
      });
    });

    return next.handle().pipe();
  }
}
