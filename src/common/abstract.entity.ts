import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

import { IsUUID } from 'class-validator';

export abstract class AbstractEntity<T extends AbstractEntity<T> = { id }> {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  @ApiProperty({ format: 'uuid' })
  readonly id: string;

  constructor(data: Partial<T>) {
    Object.assign(this, data);
  }
}
