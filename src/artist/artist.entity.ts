import { AbstractEntity } from 'common/abstract.entity';

import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column } from 'typeorm';

import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

@Entity({ name: 'artists' })
export class Artist extends AbstractEntity<Artist> {
  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Column()
  @IsBoolean()
  @ApiProperty()
  grammy: boolean;
}
