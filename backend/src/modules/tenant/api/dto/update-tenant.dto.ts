/* libs */
import { PartialType } from '@nestjs/mapped-types';

/* dto */
import { CreateTenantDto } from './create-tenant.dto';

export class UpdateTenantDto extends PartialType(CreateTenantDto) {}
