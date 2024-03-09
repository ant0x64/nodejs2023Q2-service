import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { UserModule } from 'src/user/user.module';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule, TrackModule],
  controllers: [FavoriteController],
  providers: [
    FavoriteService,
    {
      useExisting: ArtistService,
      provide: 'ArtistService',
    },
    {
      useExisting: AlbumService,
      provide: 'AlbumService',
    },
    {
      useExisting: TrackService,
      provide: 'TrackService',
    },
  ],
})
export class FavoriteModule {}
