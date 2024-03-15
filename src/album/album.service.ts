import { AbstractService } from 'src/common/abstract.service';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';

import { validate } from 'class-validator';

@Injectable()
export class AlbumService extends AbstractService<Album> {
  @InjectRepository(Album)
  protected repository: Repository<Album>;

  create(createDto: CreateAlbumDto) {
    const entity = new Album(createDto as Album);
    validate(entity);

    return this.repository.save(entity);
  }
}
