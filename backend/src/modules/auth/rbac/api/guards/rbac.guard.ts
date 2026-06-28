import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RbacService } from '../../domain/services/rbac.service';
import { RbacCacheResolver } from '../resolvers/rbac-cache.resolver';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { InsufficientRoleException } from '../../exceptions/insufficient-role.exception';
import { RoleNotFoundException } from '../../exceptions/role-not-found.exception';
import { InsufficientPermissionsException } from '../../exceptions/insufficient-permission.exception';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rbac: RbacService,
    private readonly cacheResolver: RbacCacheResolver,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return false;

    const role = await this.cacheResolver.getRoleById(user.role);

    if (!role) {
      throw new RoleNotFoundException();
    }

    const roleName = role.name;

    if (requiredRoles?.length) {
      const hasRole = this.rbac.hasRole(roleName, requiredRoles);

      if (!hasRole)
        throw new InsufficientRoleException(roleName, requiredRoles);
    }

    if (requiredPermissions?.length) {
      const permissionsSet = await this.cacheResolver.resolvePermissions(user);

      const hasPermissions = this.rbac.hasPermissions(
        permissionsSet,
        requiredPermissions,
      );

      if (!hasPermissions)
        throw new InsufficientPermissionsException(requiredPermissions);
    }

    return true;
  }
}
