import { PlanForbiddenException } from './base-plan.exception';

export class InsufficientPlanException extends PlanForbiddenException {
  constructor(currentPlan: string, requiredPlans: string[]) {
    super(
      `Current plan '${currentPlan}' does not allow access. Required: [${requiredPlans.join(
        ', ',
      )}]`,
    );

    this.name = 'InsufficientPlanException';
  }
}
