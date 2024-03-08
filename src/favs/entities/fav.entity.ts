import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';

export class Favorites {
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
}
