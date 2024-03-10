import { IsUUID, IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @IsUUID(4)
  @ApiProperty({ format: 'uuid' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsBoolean()
  @ApiProperty()
  grammy: boolean;

  constructor(data: Partial<Artist>) {
    Object.assign(this, data);
  }
}
