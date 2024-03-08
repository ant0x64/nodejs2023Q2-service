import { IsUUID, IsString, IsNotEmpty, IsInt } from 'class-validator';
import { Album } from 'src/album/entities/album.entity';

export class Track {
  @IsUUID(4)
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  artistId: Pick<Album, 'artistId'> | null;
  albumId: Pick<Album, 'id'> | null;

  @IsInt()
  duration: number; // integer number

  constructor(data: Partial<Track>) {
    Object.assign(this, data);
  }
}
