import {
  Catch,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
  HttpExceptionBody,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { LoggingService } from './logging.service';

import { IncomingMessage, ServerResponse } from 'node:http';

@Catch()
@Injectable()
export class LoggingFilter implements ExceptionFilter<HttpException> {
  constructor(private logger: LoggingService) {
    this.logger.setContext(this.constructor.name);
  }
  catch(exception: Error | undefined, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<IncomingMessage>();
    const response = host.switchToHttp().getResponse<ServerResponse>();

    const responseBody =
      exception && exception['response']
        ? exception['response']
        : ({
            error: 'Internal Server Error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          } as HttpExceptionBody);

    response.statusCode =
      (exception && exception['status']) || HttpStatus.INTERNAL_SERVER_ERROR;

    if (!request.headers['x-intercepted']) {
      this.logger.log(
        'Incomming Request: ' +
          JSON.stringify({
            controller: 'no-controller',
            method: request.method,
            url: request.url,
            params: request['params'] || '',
            body: request['body'] || '',
          }),
      );
    }

    this.logger.error(
      exception?.message || 'Unexpected Error' + exception?.stack,
    );

    response.setHeader('Content-Type', 'text/json');
    response.write(JSON.stringify(responseBody));

    response.end();

    if (!request.headers['x-intercepted']) {
      this.logger.log(
        'Server Responce: ' +
          JSON.stringify({
            status: response.statusCode,
            message: response.statusMessage,
          }),
      );
    }
  }
}
