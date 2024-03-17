import { AbstractService } from 'src/common/abstract.service';

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { Favorite } from './favorite.entity';

import { validate } from 'class-validator';

@Injectable()
export class FavoriteService extends AbstractService<Favorite> {
  protected services: {
    artists: ArtistService;
    albums: AlbumService;
    tracks: TrackService;
  };

  constructor(
    @InjectRepository(Favorite)
    repository: Repository<Favorite>,
    artistService: ArtistService,
    albumService: AlbumService,
    trackService: TrackService,
  ) {
    super(repository);
    this.services = {
      artists: artistService,
      albums: albumService,
      tracks: trackService,
    };
  }

  create(createDto: Partial<Favorite>) {
    const entity = new Favorite({
      ...createDto,
    });
    validate(entity);

    return this.repository.save(entity);
  }

  async findByUser(userId: Favorite['userId']): Promise<Favorite> {
    return (
      (await this.repository.findOne({
        where: { userId },
      })) || (await this.create({ userId }))
    );
  }

  async add(
    fav: Favorite,
    entity: keyof FavoriteService['services'],
    id: string,
  ) {
    const item = await this.services[entity].findOne(id);
    if (!item) {
      throw new UnprocessableEntityException();
    }

    if (!fav[entity]) {
      fav[entity] = [];
    }

    (fav[entity] as typeof item[]).push(item);
    return this.repository.save(fav);
  }

  async delete(
    fav: Favorite,
    entity: keyof FavoriteService['services'],
    id: string,
  ) {
    const index = fav[entity].findIndex((entity) => entity.id === id);
    if (index === -1) {
      throw new UnprocessableEntityException();
    }
    fav[entity].splice(index, 1);

    return this.repository.save(fav);
  }
}
