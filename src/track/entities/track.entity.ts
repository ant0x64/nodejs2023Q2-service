import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';

export class Track {
  @IsUUID(4)
  @ApiProperty({ format: 'uuid' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsUUID(4)
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  artistId: Artist['id'] | null = null;

  @IsOptional()
  @IsUUID(4)
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  albumId: Album['id'] | null = null;

  @IsInt()
  @Min(0)
  @ApiProperty({ minimum: 0 })
  duration: number;

  constructor(data: Partial<Track>) {
    Object.assign(this, data);
  }
}
