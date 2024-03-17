import { AbstractEntity } from 'src/common/abstract.entity';
import { Artist } from 'src/artist/artist.entity';

import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne } from 'typeorm';

import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity({ name: 'albums' })
export class Album extends AbstractEntity<Album> {
  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Column()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  @ApiProperty({ format: 'year', minimum: 1900 })
  year: number;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @Exclude()
  @IsOptional()
  artist: Artist | null;

  @Column({ nullable: true })
  @IsUUID(4)
  @IsOptional()
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  artistId: Artist['id'] | null;
}
