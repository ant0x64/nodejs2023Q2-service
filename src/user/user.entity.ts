import { AbstractEntity } from 'common/abstract.entity';

import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

import { IsString, IsNotEmpty, IsInt, IsDate, Min } from 'class-validator';
import { Exclude, Transform } from 'class-transformer';
import { HashService } from 'common/services/hash.service';

@Entity({ name: 'users' })
export class User extends AbstractEntity<User> {
  @Column(/*{ unique: true }*/)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  login: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await HashService.hash(this.password);
  }

  async checkPassword(password) {
    return await HashService.compare(password, this.password);
  }

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
