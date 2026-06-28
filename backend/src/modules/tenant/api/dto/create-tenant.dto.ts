/* libs */
import { IsString, IsOptional } from 'class-validator';

/* interfaces and enums */
import { GearPlan } from '@modules/tenant/domain/enums/gear-up-plan.enum';

export class CreateTenantDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  ownerUserId?: string;

  @IsOptional()
  document?: string;

  @IsOptional()
  settings?: {
    timezone: string;
    currency: string;
  };

  @IsOptional()
  subscription?: {
    plan: GearPlan;
  };
}
