import { OmitType } from '@nestjs/mapped-types';
import { Artist } from 'src/artist/entities/artist.entity';

export class CreateArtistDto extends OmitType(Artist, ['id']) {}
