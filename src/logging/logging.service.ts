import {
  Injectable,
  Scope,
  ConsoleLogger,
  ConsoleLoggerOptions,
  LogLevel,
  Inject,
} from '@nestjs/common';

import FileWritter from './utils/file-writter';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
  @Inject('WRITTER_DEBUG') protected _debug: FileWritter;
  @Inject('WRITTER_ERROR') protected _error: FileWritter;

  constructor(context?: string, options: ConsoleLoggerOptions = {}) {
    options.logLevels = process.env.LOG_LEVEL?.split(',').map((el) => {
      return el as LogLevel;
    }) || ['warn'];
    super(context, options);
  }

  protected printMessages(...args): void {
    const [messages, context, level, type = 'stdout'] = args;

    super.printMessages.apply(this, args);
    (messages as string[]).forEach((message) => {
      const pidMessage = this.formatPid(process.pid);
      const timestampDiff = this.updateAndGetTimestampDiff();
      const formattedLogLevel = level.toUpperCase().padStart(7, ' ');
      const formattedMessage = `${pidMessage}${this.getTimestamp()} ${formattedLogLevel} [${context}] ${message}${timestampDiff}\n`;
      this.writeMessage(formattedMessage, type);
    });
  }

  writeMessage(message: string, type: 'stdout' | 'stderr') {
    switch (type) {
      case 'stderr':
        this._error.write(message);
        break;
      default:
        this._debug.write(message);
    }
  }
}
