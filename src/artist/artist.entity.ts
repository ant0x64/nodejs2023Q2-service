import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column } from 'typeorm';

import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { AbstractEntity } from 'src/common/abstract.entity';

@Entity()
export class Artist extends AbstractEntity {
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
