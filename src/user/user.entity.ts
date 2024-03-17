import { AbstractEntity } from 'src/common/abstract.entity';

import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsString, IsNotEmpty, IsInt, IsDate, Min } from 'class-validator';
import { Exclude, Transform } from 'class-transformer';

@Entity({ name: 'users' })
export class User extends AbstractEntity<User> {
  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  login: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  @ApiProperty({ writeOnly: true })
  password: string;

  @VersionColumn()
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({ minimum: 1 })
  version: number;

  @CreateDateColumn()
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ format: 'timestamp' })
  @Transform((params) => params.value.getTime(), { toPlainOnly: true })
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ format: 'timestamp' })
  @Transform((params) => params.value.getTime(), { toPlainOnly: true })
  updatedAt: Date;
}
