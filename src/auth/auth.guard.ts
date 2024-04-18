import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from './auth.service';
import { META_IS_PUBLIC } from './auth.decorator';

import { IncomingMessage } from 'node:http';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    protected authService: AuthService,
    protected reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext) {
    if (this.reflector.get<boolean>(META_IS_PUBLIC, context.getClass())) {
      return true;
    }

    const request = context.switchToHttp().getRequest<IncomingMessage>();
    const token = this.extractToken(request);

    if (!token || !this.authService.verifyToken(token)) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractToken(request: IncomingMessage): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
