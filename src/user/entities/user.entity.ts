import { IsUUID, IsString, IsNotEmpty, IsInt, IsDate } from 'class-validator';
import { Exclude } from 'class-transformer';

export class User {
  @IsUUID(4)
  id: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @Exclude()
  password: string;

  @IsInt()
  version: number;

  @IsDate()
  createdAt: number;
  @IsDate()
  updatedAt: number;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
