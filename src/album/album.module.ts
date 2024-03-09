import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from 'src/track/track.module';
import { TrackService } from 'src/track/track.service';
import { ArtistModule } from 'src/artist/artist.module';
import { ArtistService } from 'src/artist/artist.service';

@Module({
  imports: [TrackModule, ArtistModule],
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      useExisting: TrackService,
      provide: 'TrackService',
    },
    {
      useExisting: ArtistService,
      provide: 'ArtistService',
    },
  ],
})
export class AlbumModule {}
