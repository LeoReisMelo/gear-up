/* libs */
import { Module } from '@nestjs/common';

/* modules */
import { AuthModule } from '@auth/auth.module';
import { DatabaseModule } from '@infra/database/database.module';
import { TenantModule } from '@modules/tenant/tenant.module';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [DatabaseModule, AuthModule, TenantModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
