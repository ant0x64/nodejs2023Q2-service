import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Artist } from 'src/artist/artist.entity';

export class Album {
  @IsUUID(4)
  @ApiProperty({ format: 'uuid' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  @ApiProperty({ format: 'year', minimum: 1900 })
  year: number;

  @IsUUID(4)
  @IsOptional()
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  artistId: Artist['id'] | null = null;

  constructor(data: Partial<Album>) {
    Object.assign(this, data);
  }
}
