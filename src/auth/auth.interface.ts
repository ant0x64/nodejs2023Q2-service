import { User } from 'user/user.entity';

export interface JwtPayload {
  sub: User['id'];
  userId: User['id'];
  login: User['login'];
}
