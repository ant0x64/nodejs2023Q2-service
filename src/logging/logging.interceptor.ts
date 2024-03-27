import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { LoggingService } from './logging.service';
import { EOL } from 'os';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: LoggingService) {
    this.logger.setContext(this.constructor.name);
  }
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();

    this.logger.log(
      'Request Recieved' +
        EOL +
        `URL: ${request.url}` +
        EOL +
        (typeof request['params'] === 'object'
          ? `PARAMS: ${JSON.stringify(request['params'])}` + EOL
          : '') +
        `BODY: ${JSON.stringify(request.body)}`,
    );

    return next.handle();
  }
}
