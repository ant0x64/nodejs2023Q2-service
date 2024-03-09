import { IsUUID, IsString, IsNotEmpty, IsInt } from 'class-validator';
import { Album } from 'src/album/entities/album.entity';

export class Track {
  @IsUUID(4)
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  artistId: Pick<Album, 'artistId'> | null = null;
  albumId: Pick<Album, 'id'> | null = null;

  @IsInt()
  duration: number;

  constructor(data: Partial<Track>) {
    Object.assign(this, data);
  }
}
