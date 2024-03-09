import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule, FavoriteModule],
})
export class AppModule {}
