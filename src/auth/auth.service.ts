import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './auth.interface';

import { User } from 'user/user.entity';
import { UserService } from 'user/user.service';

@Injectable()
export class AuthService {
  constructor(
    protected readonly userService: UserService,
    protected readonly jwtService: JwtService,
  ) {}

  verifyToken(token: string): User['id'] | null {
    try {
      const payload = this.jwtService.verify(token);
      return payload.sub;
    } catch {
      return null;
    }
  }

  generateToken(user: User): string {
    return this.jwtService.sign(this.generatePayload(user), {
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '60s',
    });
  }

  generateRefreshToken(user: User): string {
    return this.jwtService.sign(this.generatePayload(user), {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '1h',
    });
  }

  private generatePayload(user: User): JwtPayload {
    return { sub: user.id, userId: user.id, login: user.login };
  }

  revokeToken(_: string) {
    return _;
    // not implemented
  }
}
