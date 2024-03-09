import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class TrackService {
  private items: Record<Track['id'], Track> = {};

  constructor(private artistService: ArtistService) {
    this.artistService.deleteArtist$.subscribe((artistId) => {
      Object.values(this.items).forEach((album) => {
        if (artistId !== album.artistId) {
          return;
        }
        this.update(album.id, {
          artistId: null,
        });
      });
    });
  }

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
