import { IsUUID, IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Artist } from 'src/artist/entities/artist.entity';

export class Album {
  @IsUUID(4)
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  year: number;

  artistId: Pick<Artist, 'id'> | null;

  constructor(data: Partial<Album>) {
    Object.assign(this, data);
  }
}
