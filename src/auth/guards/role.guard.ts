import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/role.decorator';
import { TokenPayload } from '../token-payload.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const user = context
      .switchToHttp()
      .getRequest<{ user?: TokenPayload }>().user;

    if (!user) {
      throw new Error('User not found in request');
    }

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
