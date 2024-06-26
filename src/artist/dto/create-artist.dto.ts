import { OmitType } from '@nestjs/swagger';
import { Artist } from 'artist/artist.entity';

export class CreateArtistDto extends OmitType(Artist, ['id']) {}
