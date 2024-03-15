import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';

import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [ArtistModule, TypeOrmModule.forFeature([Album])],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
