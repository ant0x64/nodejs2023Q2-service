import { IsUUID } from 'class-validator';
import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';
import { Exclude, Transform } from 'class-transformer';

const transformToPlainArray = (instance) => Object.values(instance.value);

export class Favorite {
  @IsUUID()
  @Optional()
  @Exclude()
  userId: User['id'];

  @Transform(transformToPlainArray, { toPlainOnly: true })
  @ApiProperty({ type: [Artist] })
  artists: Record<Artist['id'], Artist> = {};

  @Transform(transformToPlainArray, { toPlainOnly: true })
  @ApiProperty({ type: [Album] })
  albums: Record<Album['id'], Album> = {};

  @Transform(transformToPlainArray, { toPlainOnly: true })
  @ApiProperty({ type: [Track] })
  tracks: Record<Track['id'], Track> = {};
}
