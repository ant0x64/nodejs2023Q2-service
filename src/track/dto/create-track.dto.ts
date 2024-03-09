import { OmitType } from '@nestjs/mapped-types';
import { Track } from 'src/track/entities/track.entity';

export class CreateTrackDto extends OmitType(Track, ['id']) {}
