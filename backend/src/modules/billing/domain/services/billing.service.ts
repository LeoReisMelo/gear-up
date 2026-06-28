import { PlansRepository } from '@modules/plans/infra/repositories/plans.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingService {
  constructor(private readonly plansRepository: PlansRepository) {}

  async getPlanByName(name: string) {
    return this.plansRepository.findByName(name);
  }

  async hasFeature(planName: string, feature: string): Promise<boolean> {
    const plan = await this.plansRepository.findByName(planName);

    if (!plan) return false;

    return plan?.features?.includes(feature) || false;
  }

  async validateAccess(planName: string, requiredPlans: string[]) {
    const plan = await this.plansRepository.findByName(planName);

    if (!plan) return false;

    const required = await Promise.all(
      requiredPlans.map((p) => this.plansRepository.findByName(p)),
    );

    if (required.some((r) => !r)) return false;

    return required.some((r) => plan.value >= r!.value);
  }
}
