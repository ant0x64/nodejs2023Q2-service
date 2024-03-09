import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private items: Record<User['id'], User> = {};

  create(createUserDto: CreateUserDto): User {
    const id = uuid();
    const date = Date.now();

    // @todo class validation
    const user = new User({
      ...createUserDto,
      id,
      version: 1,
      createdAt: date,
      updatedAt: date,
    });

    this.items[id] = user;
    return user;
  }

  findAll(): User[] {
    return Object.values(this.items);
  }

  findOne(id: User['id']): User | undefined {
    return this.items[id];
  }

  update(id: User['id'], updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      Object.assign(user, updateUserDto);
      user.updatedAt = Date.now();
      user.version++;
    }

    return user;
  }

  remove(id: User['id']): boolean {
    return delete this.items[id];
  }
}
