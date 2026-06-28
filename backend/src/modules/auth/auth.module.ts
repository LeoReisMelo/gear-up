import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './api/controllers/auth.controller';
import { AuthService } from './domain/services/auth.service';
import { UsersRepository } from '@modules/users/infra/repositories/users.repository';
import { TenantRepository } from '@modules/tenant/infra/repositories/tenant.repository';
import { BcryptUtil } from '@shared/utils/crypto/bcrypt';
import { JwtAdapter } from './domain/adapters/jwt.adapter';
import { UserSchema } from '@modules/users/infra/schemas/users.schema';
import { TenantSchema } from '@modules/tenant/infra/schemas/tenant.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '@modules/users/domain/services/users.service';
import { Env } from '@infra/config/env';
import { RbacService } from './rbac/domain/services/rbac.service';
import { PlansService } from './rbac/domain/services/plans.service';
import { TenantContextService } from './rbac/api/contexts/tenant.context';
import { RbacCacheResolver } from './rbac/api/resolvers/rbac-cache.resolver';
import { PermissionCacheService } from '@infra/redis/cache.service';
import Redis from 'ioredis';
import { RolesRepository } from '@modules/roles/infra/repositories/roles.repository';
import { RolesSchema } from '@modules/roles/infra/schemas/roles.schema';
import { Reflector } from '@nestjs/core';
import { PermissionSchema } from '@modules/permissions/infra/schemas/permissions.schema';
import { PlansSchema } from '@modules/plans/infra/schemas/plans.schema';
import { PlansRepository } from '@modules/plans/infra/repositories/plans.repository';
import { SessionsRepository } from '@modules/sessions/infra/repositories/sessions.repository';
import { SessionSchema } from '@modules/sessions/infra/schemas/sessions.schema';

@Module({
  imports: [
    JwtModule.register({
      secret: Env.auth.jwtSecret,
      signOptions: {
        expiresIn: `${Env.auth.jwtExpiresIn}h`,
        algorithm: 'HS256',
      },
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'Tenant',
        schema: TenantSchema,
      },
      {
        name: 'Role',
        schema: RolesSchema,
      },
      {
        name: 'Permission',
        schema: PermissionSchema,
      },
      {
        name: 'Plan',
        schema: PlansSchema,
      },
      {
        name: 'Session',
        schema: SessionSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    Reflector,
    AuthService,
    UsersService,
    UsersRepository,
    TenantRepository,
    PlansRepository,
    BcryptUtil,
    JwtAdapter,
    RbacService,
    PlansService,
    TenantContextService,
    RbacCacheResolver,
    Redis,
    PermissionCacheService,
    RolesRepository,
    SessionsRepository,
  ],
  exports: [
    JwtAdapter,
    RbacService,
    PlansService,
    TenantContextService,
    RbacCacheResolver,
  ],
})
export class AuthModule {}
