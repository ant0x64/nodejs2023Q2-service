import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
} from 'class-validator';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';

export class Track {
  @IsUUID(4)
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID(4)
  artistId: Artist['id'] | null = null;
  @IsOptional()
  @IsUUID(4)
  albumId: Album['id'] | null = null;

  @IsInt()
  duration: number;

  constructor(data: Partial<Track>) {
    Object.assign(this, data);
  }
}
