import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { ArtistModule } from 'src/artist/artist.module';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumModule } from 'src/album/album.module';
import { AlbumService } from 'src/album/album.service';

@Module({
  imports: [ArtistModule, AlbumModule],
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      useExisting: ArtistService,
      provide: 'ArtistService',
    },
    {
      useExisting: AlbumService,
      provide: 'AlbumService',
    },
  ],
  exports: [TrackService],
})
export class TrackModule {}
