import { AbstractEntity } from 'src/common/abstract.entity';
import { Artist } from 'src/artist/artist.entity';
import { Album } from 'src/album/entities/album.entity';

import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';

@Entity({ name: 'tracks' })
export class Track extends AbstractEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @OneToOne(() => Artist)
  @JoinColumn()
  @IsOptional()
  @IsUUID(4)
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  artistId: Artist | null = null;

  @OneToOne(() => Album)
  @JoinColumn()
  @IsOptional()
  @IsUUID(4)
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  albumId: Album | null = null;

  @Column()
  @IsInt()
  @Min(0)
  @ApiProperty({ minimum: 0 })
  duration: number;
}
