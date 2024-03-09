import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  IsDate,
  Min,
} from 'class-validator';
import { Exclude } from 'class-transformer';

export class User {
  @IsUUID(4)
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @Exclude({ toPlainOnly: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  version: number;

  @IsDate()
  @IsNotEmpty()
  createdAt: number;

  @IsDate()
  @IsNotEmpty()
  updatedAt: number;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
