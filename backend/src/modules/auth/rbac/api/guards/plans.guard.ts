import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PLAN_KEY } from '../decorators/plans.decorator';
import { PlansService } from '../../domain/services/plans.service';
import { InsufficientPlanException } from '../../exceptions/insufficient-plan.exception';

@Injectable()
export class PlanGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly planService: PlansService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPlans = this.reflector.getAllAndOverride<string[]>(PLAN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPlans?.length) return true;

    const request = context.switchToHttp().getRequest();
    const tenant = request.tenant;

    if (!tenant?.subscription?.plan) {
      throw new InsufficientPlanException('NONE', requiredPlans);
    }

    const currentPlan = tenant.subscription.plan;

    const allowed = await this.planService.hasPlan(currentPlan, requiredPlans);

    if (!allowed) {
      throw new InsufficientPlanException(currentPlan, requiredPlans);
    }

    return true;
  }
}
