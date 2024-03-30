import { ConsoleLogger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

import { LoggingService } from './logging.service';
import { LoggingInterceptor } from './logging.interceptor';
import { LoggingFilter } from './logging.filter';

import LogsWritter from './lib/logs-writter';

@Module({
  imports: [],
  exports: [LoggingService],
  providers: [
    LoggingService,
    ConsoleLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: LoggingFilter,
    },
    {
      provide: 'WRITTER_DEBUG',
      useValue: new LogsWritter('debug'),
    },
    {
      provide: 'WRITTER_ERROR',
      useValue: new LogsWritter('error'),
    },
  ],
})
export class LoggingModule {
  constructor(private logging: LoggingService) {
    process.on('unhandledRejection', () => {
      this.logging.error('Unhandled Rejection');
    });

    process.on('uncaughtException', (error: Error) => {
      this.logging.error('Unhandled Exception: ' + error.stack);
    });
  }
}
