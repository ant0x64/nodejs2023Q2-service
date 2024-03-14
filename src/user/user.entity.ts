import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  IsDate,
  Min,
} from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  @ApiProperty({ format: 'uuid' })
  readonly id: string;

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
  createdAt: number;

  @UpdateDateColumn()
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ format: 'timestamp' })
  updatedAt: number;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
