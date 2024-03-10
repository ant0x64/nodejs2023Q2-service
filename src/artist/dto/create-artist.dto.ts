import { OmitType } from '@nestjs/swagger';
import { Artist } from 'src/artist/entities/artist.entity';

export class CreateArtistDto extends OmitType(Artist, ['id']) {}
