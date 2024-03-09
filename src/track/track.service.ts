import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private items: Record<Track['id'], Track> = {
    // '5f8ab3b7-24ea-42e7-bc27-4ea1bf1f41e5': new Track({
    //   id: '5f8ab3b7-24ea-42e7-bc27-4ea1bf1f41e5',
    //   name: 'test',
    //   artistId: null,
    //   albumId: null,
    //   duration: 100,
    // }),
  };

  create(createTrackDto: CreateTrackDto): Track {
    const id = uuid();

    // @todo class validation
    const track = new Track({
      ...createTrackDto,
      id,
    });

    this.items[id] = track;
    return track;
  }

  findAll(): Track[] {
    return Object.values(this.items);
  }

  findOne(id: Track['id']): Track | undefined {
    return this.items[id];
  }

  findByAlbumeId(id: Track['albumId']): Track[] {
    return Object.values(this.items).filter((t) => t.albumId === id);
  }

  update(id: Track['id'], updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    if (track) {
      Object.assign(track, updateTrackDto);
    }

    return track;
  }

  remove(id: Track['id']): boolean {
    return delete this.items[id];
  }
}
