import { AbstractEntity } from 'common/abstract.entity';

import { Artist } from 'artist/artist.entity';
import { Album } from 'album/album.entity';
import { Track } from 'track/track.entity';
import { User } from 'user/user.entity';

import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

import { IsUUID, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity({ name: 'favorites' })
export class Favorite extends AbstractEntity<Favorite> {
  //@OneToOne(() => User)
  @Column('uuid')
  @IsUUID()
  @IsOptional()
  @Exclude()
  userId: User['id'];

  @ManyToMany(() => Artist, { eager: true })
  @JoinTable()
  @ApiProperty({ type: [Artist] })
  artists: Artist[];

  @ManyToMany(() => Album, { eager: true })
  @JoinTable()
  @ApiProperty({ type: [Album] })
  albums: Album[];

  @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  @ApiProperty({ type: [Track] })
  tracks: Track[];
}
