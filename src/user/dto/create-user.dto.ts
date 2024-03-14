import { PickType } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class CreateUserDto extends PickType(User, ['login', 'password']) {}
