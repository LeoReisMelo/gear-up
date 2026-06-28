/* libs */
import { IsOptional, IsString } from 'class-validator';

export class UpdateTenantSettingsDto {
  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsString()
  currency?: string;
}
