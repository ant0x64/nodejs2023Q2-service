import {
  Injectable,
  Scope,
  ConsoleLogger,
  ConsoleLoggerOptions,
  LogLevel,
} from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
  constructor(context?: string, options: ConsoleLoggerOptions = {}) {
    options.logLevels = process.env.LOG_LEVEL?.split(',').map((el) => {
      return el as LogLevel;
    }) || ['warn'];
    super(context, options);
    console.log(this.options);
  }
}
