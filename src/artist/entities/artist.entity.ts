import { IsUUID, IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class Artist {
  @IsUUID(4)
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;

  constructor(data: Partial<Artist>) {
    Object.assign(this, data);
  }
}
