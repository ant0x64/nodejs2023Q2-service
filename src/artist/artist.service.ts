import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './artist.entity';

import { validate } from 'class-validator';

import { AbstractService } from 'src/common/abstract.service';

@Injectable()
export class ArtistService extends AbstractService<Artist> {
  @InjectRepository(Artist)
  protected repository: Repository<Artist>;

  create(createDto: CreateArtistDto) {
    const entity = new Artist(createDto as Artist);
    validate(entity);

    return this.repository.save(entity);
  }
}
