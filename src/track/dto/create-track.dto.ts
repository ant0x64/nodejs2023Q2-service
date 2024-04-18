import { OmitType } from '@nestjs/swagger';
import { Track } from 'track/track.entity';

export class CreateTrackDto extends OmitType(Track, ['id']) {}
