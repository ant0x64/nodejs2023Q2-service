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

import { ServerResponse } from 'node:http';

@Catch()
@Injectable()
export class LoggingFilter implements ExceptionFilter<HttpException> {
  constructor(private logger: LoggingService) {
    this.logger.setContext(this.constructor.name);
  }
  catch(exception: Error | undefined, host: ArgumentsHost) {
    this.logger.error(
      exception?.message || 'Unexpected Error' + exception?.stack,
    );

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

    response.setHeader('Content-Type', 'text/json');
    response.write(JSON.stringify(responseBody));

    response.end();
  }
}
