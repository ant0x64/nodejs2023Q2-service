import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';

import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';

import { UserModule } from 'user/user.module';
import { ArtistModule } from 'artist/artist.module';
import { AlbumModule } from 'album/album.module';
import { TrackModule } from 'track/track.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
