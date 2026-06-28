/* lib */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/* schemas */
import { RolesSchema } from '@modules/roles/infra/schemas/roles.schema';
import { TenantSchema } from '@modules/tenant/infra/schemas/tenant.schema';
import { UserSchema } from './infra/schemas/users.schema';

/* controllers */
import { UsersController } from './api/controllers/users.controller';

/* services */
import { UsersService } from './domain/services/users.service';

/* repositories */
import { RolesRepository } from '@modules/roles/infra/repositories/roles.repository';
import { TenantRepository } from '@modules/tenant/infra/repositories/tenant.repository';
import { UsersRepository } from './infra/repositories/users.repository';

/* modules */
import { AuthModule } from '@modules/auth/auth.module';

/* shared */
import { BcryptUtil } from '@shared/utils/crypto/bcrypt';
import { ProfileController } from './api/controllers/profile.controller';
import { StatisticsController } from './api/controllers/statistcs.controller';
import { ExportController } from './api/controllers/export.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Role',
        schema: RolesSchema,
      },
      {
        name: 'Tenant',
        schema: TenantSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [
    ProfileController,
    StatisticsController,
    ExportController,
    UsersController,
  ],
  providers: [
    BcryptUtil,
    RolesRepository,
    TenantRepository,
    UsersRepository,
    UsersService,
  ],
})
export class UsersModule {}
