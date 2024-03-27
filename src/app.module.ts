import { config } from 'dotenv';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'user/user.module';
import { TrackModule } from 'track/track.module';
import { ArtistModule } from 'artist/artist.module';
import { AlbumModule } from 'album/album.module';
import { FavoriteModule } from 'favorite/favorite.module';
import { LoggingModule } from './logging/logging.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: process.env.NODE_ENV === 'development',
      autoLoadEntities: true,
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
    LoggingModule,
  ],
})
export class AppModule {}
