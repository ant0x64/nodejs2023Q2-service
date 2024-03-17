import { OmitType } from '@nestjs/swagger';
import { Track } from 'src/track/track.entity';

export class CreateTrackDto extends OmitType(Track, ['id']) {}
