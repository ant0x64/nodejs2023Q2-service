import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private items: Record<Artist['id'], Artist> = {
    '5f8ab3b7-24ea-42e7-bc27-4ea1bf1f41e5': new Artist({
      id: '5f8ab3b7-24ea-42e7-bc27-4ea1bf1f41e5',
      name: 'test',
      grammy: false,
    }),
  };

  create(createArtistDto: CreateArtistDto): Artist {
    const id = uuid();

    // @todo class validation
    const artist = new Artist({
      ...createArtistDto,
      id,
    });

    this.items[id] = artist;
    return artist;
  }

  findAll(): Artist[] {
    return Object.values(this.items);
  }

  findOne(id: Artist['id']): Artist | undefined {
    return this.items[id];
  }

  update(id: Artist['id'], updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);
    if (artist) {
      Object.assign(artist, updateArtistDto);
    }

    return artist;
  }

  remove(id: Artist['id']): boolean {
    return delete this.items[id];
  }
}
