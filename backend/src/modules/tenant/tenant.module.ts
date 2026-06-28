/* libs */
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

/* schemas */
import { TenantSchema } from './infra/schemas/tenant.schema';

/* repositories */
import { TenantRepository } from './infra/repositories/tenant.repository';

/* services */
import { TenantService } from './domain/services/tenant.service';

/* controllers */
import { TenantController } from './api/controllers/tenant.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tenant', schema: TenantSchema }]),
  ],
  controllers: [TenantController],
  providers: [TenantRepository, TenantService],
  exports: [TenantService, TenantRepository],
})
export class TenantModule {}
