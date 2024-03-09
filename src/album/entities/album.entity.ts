import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { Artist } from 'src/artist/entities/artist.entity';

export class Album {
  @IsUUID(4)
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;

  @IsUUID(4)
  @IsOptional()
  artistId: Pick<Artist, 'id'> | null = null;

  constructor(data: Partial<Album>) {
    Object.assign(this, data);
  }
}
