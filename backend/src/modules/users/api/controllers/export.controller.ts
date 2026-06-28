import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';

/* guards */
import { JwtAuthGuard } from '@modules/auth/rbac/api/guards/jwt-auth.guard';
import { TenantGuard } from '@modules/auth/rbac/api/guards/tenant.guard';
import { RbacGuard } from '@modules/auth/rbac/api/guards/rbac.guard';
import { CurrentUser } from '@modules/auth/rbac/api/decorators/current-user.decorator';
import { UsersService } from '@modules/users/domain/services/users.service';

@Controller('users/export')
@UseGuards(JwtAuthGuard, TenantGuard, RbacGuard)
export class ExportController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async exportUsers(
    @Query('format') format: 'pdf' | 'xlsx' | 'txt',
    @Res() res: Response,
    @CurrentUser() user: any,
  ) {
    const file = await this.usersService.exportUsers(user, format);

    res.set({
      'Content-Type': file.mimeType,
      'Content-Disposition': `attachment; filename=${file.fileName}`,
    });

    return res.send(file.buffer);
  }
}
