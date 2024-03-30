import {
  Injectable,
  Scope,
  ConsoleLogger,
  ConsoleLoggerOptions,
  LogLevel,
  Inject,
} from '@nestjs/common';

import { Writable } from 'node:stream';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
  @Inject('WRITTER_DEBUG') protected _debug: Writable;
  @Inject('WRITTER_ERROR') protected _error: Writable;

  constructor(context?: string, options: ConsoleLoggerOptions = {}) {
    super(context, {
      ...options,
      logLevels: process.env.LOG_LEVEL?.split(',').map((el) => {
        return el as LogLevel;
      }) || ['warn'],
    });
  }

  // @todo Stream pipeline
  protected printMessages(...args): void {
    const [messages, context, level, type = 'stdout'] = args;

    super.printMessages.apply(this, args);
    (messages as string[]).forEach((message) => {
      this.writeMessage(`${this.format(message, context, level)}`, type);
    });
  }

  private format(message: string, context: string, level: string): string {
    const pidMessage = this.formatPid(process.pid);
    const timestampDiff = this.updateAndGetTimestampDiff();
    const formattedLogLevel = level.toUpperCase().padStart(7, ' ');
    return `${pidMessage}${this.getTimestamp()} ${formattedLogLevel} [${context}] ${message}${timestampDiff}\n`;
  }

  private writeMessage(message: string, type: 'stdout' | 'stderr') {
    switch (type) {
      case 'stderr':
        this._error.write(message);
        break;
      default:
        this._debug.write(message);
    }
  }
}
