import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { ArtistService } from 'src/artist/artist.service';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [ArtistModule],
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      useExisting: ArtistService,
      provide: 'ArtistService',
    },
  ],
  exports: [TrackService],
})
export class TrackModule {}
