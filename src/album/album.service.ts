import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  private items: Record<Album['id'], Album> = {
    '5f8ab3b7-24ea-42e7-bc27-4ea1bf1f41e5': new Album({
      id: '5f8ab3b7-24ea-42e7-bc27-4ea1bf1f41e5',
      name: 'test',
      year: 2000,
      artistId: null,
    }),
  };

  create(createAlbumDto: CreateAlbumDto): Album {
    const id = uuid();

    // @todo class validation
    const album = new Album({
      ...createAlbumDto,
      id,
    });

    this.items[id] = album;
    return album;
  }

  findAll(): Album[] {
    return Object.values(this.items);
  }

  findOne(id: Album['id']): Album | undefined {
    return this.items[id];
  }

  update(id: Album['id'], updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    if (album) {
      Object.assign(album, updateAlbumDto);
    }

    return album;
  }

  remove(id: Album['id']): boolean {
    return delete this.items[id];
  }
}
