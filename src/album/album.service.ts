import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class AlbumService {
  private items: Record<Album['id'], Album> = {};

  constructor(
    private trackService: TrackService,
    private artistService: ArtistService,
  ) {
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
    this.trackService.findByAlbumeId(id).forEach((track) => {
      this.trackService.update(track.id, {
        albumId: null,
      });
    });

    return delete this.items[id];
  }
}
