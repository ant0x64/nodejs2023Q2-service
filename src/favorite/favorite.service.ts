import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { User } from 'src/user/user.entity';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { Favorite } from './entities/favorite.entity';
import { Artist } from 'src/artist/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';

@Injectable()
export class FavoriteService {
  readonly blank_user: User['id'] = uuid();
  private items: Record<Favorite['userId'], Favorite> = {};

  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {
    this.items[this.blank_user] = new Favorite();

    this.artistService.delete$.subscribe((id) => {
      Object.values(this.items).forEach((favorite) => {
        delete favorite.artists[id];
      });
    });
    this.albumService.delete$.subscribe((id) => {
      Object.values(this.items).forEach((favorite) => {
        delete favorite.albums[id];
      });
    });
    this.trackService.delete$.subscribe((id) => {
      Object.values(this.items).forEach((favorite) => {
        delete favorite.tracks[id];
      });
    });
  }

  findAll() {
    return this.items[this.blank_user];
  }

  addArtist(id: Artist['id']) {
    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new UnprocessableEntityException();
    }
    //this.items[this.blank_user].artists[id] = artist;
  }

  removeArtist(id: Artist['id']) {
    return (
      this.items[this.blank_user].artists[id] &&
      delete this.items[this.blank_user].artists[id]
    );
  }

  addAlbum(id: Album['id']) {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new UnprocessableEntityException();
    }
    this.items[this.blank_user].albums[id] = album;
  }

  removeAlbum(id: Album['id']) {
    return (
      this.items[this.blank_user].albums[id] &&
      delete this.items[this.blank_user].albums[id]
    );
  }

  addTrack(id: Track['id']) {
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new UnprocessableEntityException();
    }
    this.items[this.blank_user].tracks[id] = track;
  }

  removeTrack(id: Track['id']) {
    return (
      this.items[this.blank_user].tracks[id] &&
      delete this.items[this.blank_user].tracks[id]
    );
  }
}
