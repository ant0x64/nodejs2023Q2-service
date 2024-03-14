import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

import { validate } from 'class-validator';

import { Subject } from 'rxjs';

@Injectable()
export class UserService {
  private items: Record<User['id'], User> = {};
  private deleteEvent = new Subject<User['id']>();

  public delete$ = this.deleteEvent.asObservable();

  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User({
      ...createUserDto,
    });
    validate(user);

    return this.repository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findOne(id: User['id']): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  update(
    id: User['id'],
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    return this.repository.preload({ id, ...updateUserDto }).then((user) => {
      return user ? this.repository.save(user) : user;
    });
  }

  remove(id: User['id']): Promise<boolean> {
    return this.findOne(id).then((user) => {
      this.deleteEvent.next(id);
      return user ? this.repository.remove(user) && true : false;
    });
  }
}
