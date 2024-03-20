import { PickType } from '@nestjs/swagger';
import { User } from 'user/user.entity';

export class CreateUserDto extends PickType(User, ['login', 'password']) {}
