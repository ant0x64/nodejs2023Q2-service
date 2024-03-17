import { AbstractEntity } from 'src/common/abstract.entity';
import { Artist } from 'src/artist/artist.entity';
import { Album } from 'src/album/album.entity';

import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne } from 'typeorm';

import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity({ name: 'tracks' })
export class Track extends AbstractEntity<Track> {
  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @Exclude()
  @IsOptional()
  artist: Artist | null;

  @Column({ nullable: true })
  @IsUUID(4)
  @IsOptional()
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  artistId: Artist['id'] | null;

  @ManyToOne(() => Album, { onDelete: 'SET NULL' })
  @Exclude()
  @IsOptional()
  album: Album | null;

  @Column({ nullable: true })
  @IsUUID(4)
  @IsOptional()
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  albumId: Album['id'] | null;

  @Column()
  @IsInt()
  @Min(0)
  @ApiProperty({ minimum: 0 })
  duration: number;
}
