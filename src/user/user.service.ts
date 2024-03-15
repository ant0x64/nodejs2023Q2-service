import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

import { validate } from 'class-validator';

import { AbstractService } from 'src/common/abstract.service';

@Injectable()
export class UserService extends AbstractService<User> {
  @InjectRepository(User)
  protected repository: Repository<User>;

  create(createDto: CreateUserDto) {
    const entity = new User(createDto as User);
    validate(entity);

    return this.repository.save(entity);
  }
}
