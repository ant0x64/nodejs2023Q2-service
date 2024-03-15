import { AbstractEntity } from 'src/common/abstract.entity';
import { Artist } from 'src/artist/artist.entity';

import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

@Entity({ name: 'albums' })
export class Album extends AbstractEntity {
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

  @OneToOne(() => Artist)
  @JoinColumn()
  @IsUUID(4)
  @IsOptional()
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  artistId: Artist | null = null;
}
