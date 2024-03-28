import { ParseUUIDPipe } from '@nestjs/common';

export class UUIDPipe extends ParseUUIDPipe {
  constructor() {
    super({ version: '4' });
  }
}
