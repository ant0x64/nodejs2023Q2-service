import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

import { Subject } from 'rxjs';

@Injectable()
export class ArtistService {
  private items: Record<Artist['id'], Artist> = {};
  private deleteEvent = new Subject<Artist['id']>();

  public delete$ = this.deleteEvent.asObservable();

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
    this.deleteEvent.next(id);
    return this.items[id] && delete this.items[id];
  }
}
