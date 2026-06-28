/* libs */
import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';

/* services */
import { TenantService } from '@modules/tenant/domain/services/tenant.service';

/* dto */
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
import { UpdateTenantSettingsDto } from '../dto/update-tenant-settings.dto';
import { UpdateTenantSubscriptionDto } from '../dto/update-tenant-subscription.dto';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get('profile')
  me(@Req() req) {
    return this.tenantService.findById(req.user.tenantId);
  }

  @Get('profile/subscription')
  subscription(@Req() req) {
    return this.tenantService.findSubscription(req.user.tenantId);
  }

  @Patch('profile/settings')
  updateSettings(@Req() req, @Body() dto: UpdateTenantSettingsDto) {
    return this.tenantService.updateSettings(req.user.tenantId, dto);
  }

  @Patch('profile/subscription')
  updateSubscription(@Req() req, @Body() dto: UpdateTenantSubscriptionDto) {
    return this.tenantService.updateSubscription(req.user.tenantId, dto);
  }

  // 🛠 ADMIN ONLY
  @Get()
  findAll() {
    return this.tenantService.findAll();
  }

  @Get(':id')
  findById(@Req() req) {
    return this.tenantService.findById(req.params.id);
  }

  @Post()
  create(@Body() dto: CreateTenantDto) {
    return this.tenantService.create(dto);
  }

  @Patch(':id')
  update(@Req() req, @Body() dto: UpdateTenantDto) {
    return this.tenantService.update(req.params.id, dto);
  }
}
