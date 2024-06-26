import { AbstractService } from 'common/abstract.service';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './album.entity';

import { validate } from 'class-validator';

@Injectable()
export class AlbumService extends AbstractService<Album> {
  @InjectRepository(Album)
  declare repository: Repository<Album>;

  create(createDto: CreateAlbumDto) {
    const entity = new Album(createDto as Album);
    validate(entity, { forbidUnknownValues: true });

    return this.repository.save(entity);
  }
}
