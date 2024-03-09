import { Injectable, ParseUUIDPipe } from '@nestjs/common';

@Injectable()
export class UUIDPipe extends ParseUUIDPipe {
  constructor() {
    super({ version: '4' });
  }
}
