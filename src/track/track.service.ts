import { AbstractService } from 'common/abstract.service';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './track.entity';

import { validate } from 'class-validator';

@Injectable()
export class TrackService extends AbstractService<Track> {
  @InjectRepository(Track)
  declare repository: Repository<Track>;

  create(createDto: CreateTrackDto) {
    const entity = new Track(createDto as Track);
    validate(entity, { forbidUnknownValues: true });

    return this.repository.save(entity);
  }
}
