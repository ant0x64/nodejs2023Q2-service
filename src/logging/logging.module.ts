import { ConsoleLogger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

import { LoggingService } from './logging.service';
import { LoggingInterceptor } from './logging.interceptor';
import { LoggingFilter } from './logging.filter';

@Module({
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
  ],
})
export class LoggingModule {
  constructor(private logging: LoggingService) {
    process.on('unhandledRejection', (error: Error) => {
      this.logging.error('Unhandled Rejection: ' + error.stack);
    });
    process.on('uncaughtException', (error: Error) => {
      this.logging.error('Unhandled Exception: ' + error.stack);
    });
  }
}
