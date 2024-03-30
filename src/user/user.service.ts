import { AbstractService } from 'common/abstract.service';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

import { validate } from 'class-validator';

@Injectable()
export class UserService extends AbstractService<User> {
  @InjectRepository(User)
  declare repository: Repository<User>;

  create(createDto: CreateUserDto) {
    const entity = new User(createDto as User);
    validate(entity, { forbidUnknownValues: true });

    return this.repository.save(entity);
  }

  findByLogin(login: User['login']) {
    return this.repository.findOne({ where: { login } });
  }
}
