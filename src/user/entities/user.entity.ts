import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  IsDate,
  Min,
} from 'class-validator';
import { Exclude } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class User {
  @IsUUID(4)
  @ApiProperty({ format: 'uuid' })
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  login: string;

  @Exclude({ toPlainOnly: true })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ writeOnly: true })
  password: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({ minimum: 1 })
  version: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ format: 'timestamp' })
  createdAt: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ format: 'timestamp' })
  updatedAt: number;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
