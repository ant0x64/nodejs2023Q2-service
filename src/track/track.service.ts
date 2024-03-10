import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { ArtistService } from 'src/artist/artist.service';

import { Subject } from 'rxjs';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class TrackService {
  private items: Record<Track['id'], Track> = {};
  private deleteEvent = new Subject<Track['id']>();

  public delete$ = this.deleteEvent.asObservable();

  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
  ) {
    this.artistService.delete$.subscribe((artistId) => {
      Object.values(this.items).forEach((track) => {
        if (artistId !== track.artistId) {
          return;
        }
        this.update(track.id, {
          artistId: null,
        });
      });
    });
    this.albumService.delete$.subscribe((albumId) => {
      Object.values(this.items).forEach((track) => {
        if (albumId !== track.albumId) {
          return;
        }
        this.update(track.id, {
          albumId: null,
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
    this.deleteEvent.next(id);
    return this.items[id] && delete this.items[id];
  }
}
