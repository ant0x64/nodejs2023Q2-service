import { ConsoleLogger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

import { ConfigModule } from '@nestjs/config';

import { LoggingService } from './logging.service';
import { LoggingInterceptor } from './logging.interceptor';
import { LoggingFilter } from './logging.filter';

import FileWritter from './utils/file-writter';

@Module({
  imports: [ConfigModule.forRoot()],
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
      useValue: new FileWritter('debug'),
    },
    {
      provide: 'WRITTER_ERROR',
      useValue: new FileWritter('error'),
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
