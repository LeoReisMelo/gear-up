import { Injectable } from '@nestjs/common';
import { PermissionCacheService } from '@infra/redis/cache.service';
import { RolesRepository } from '@modules/roles/infra/repositories/roles.repository';

@Injectable()
export class RbacCacheResolver {
  constructor(
    private readonly cache: PermissionCacheService,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async resolvePermissions(user: any): Promise<Set<string>> {
    const role = await this.rolesRepository.findById(user.role);

    if (!role) {
      return new Set();
    }

    const cacheKey = `rbac:perm:${user.tenantId}:${role.id}:${role.version}:${user.id}`;

    const cached = await this.cache.get(cacheKey);

    if (cached) {
      return new Set(cached);
    }

    const rolePermissions = (role.permissions || [])
      .filter(Boolean)
      .map((p: any) => (typeof p === 'string' ? p : p.name));

    const result = [...new Set(rolePermissions)];

    await this.cache.set(cacheKey, result);

    return new Set(result);
  }

  async getRoleById(roleId: string) {
    const cacheKey = `role:${roleId}`;

    const cached = await this.cache.get(cacheKey);

    if (cached) return cached;

    const role = await this.rolesRepository.findById(roleId);

    if (!role) return null;

    await this.cache.set(cacheKey, role);

    return role;
  }

  async invalidateRole(roleId: string) {
    await this.cache.del(`role:${roleId}`);

    await this.cache.deleteByPattern(`rbac:perm:*:${roleId}:*`);
  }
}
