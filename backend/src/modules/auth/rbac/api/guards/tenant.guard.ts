import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TenantContextService } from '../contexts/tenant.context';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private readonly tenantContext: TenantContextService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user?.tenantId) return false;

    const tenant = await this.tenantContext.load(user.tenantId);

    request.tenant = tenant;

    return true;
  }
}
