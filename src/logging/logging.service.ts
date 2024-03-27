import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger {}
