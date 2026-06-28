import { PlansRepository } from '@modules/plans/infra/repositories/plans.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlansService {
  constructor(private readonly plansRepository: PlansRepository) {}

  async hasPlan(userPlan: string, requiredPlans: string[]): Promise<boolean> {
    /**
     * 1. load current plan
     */
    const plan = await this.plansRepository.findByName(userPlan);

    if (!plan) return false;

    /**
     * 2. load required plans
     */
    const required = await Promise.all(
      requiredPlans.map((name) => this.plansRepository.findByName(name)),
    );

    if (required.some((r) => !r)) return false;

    /**
     * 3. simple name match (NO hierarchy, NO level)
     */
    const requiredNames = required.map((r) => r!.name);

    return requiredNames.includes(plan.name);
  }
}
