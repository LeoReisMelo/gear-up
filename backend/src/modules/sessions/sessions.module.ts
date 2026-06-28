/* lib */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/* shared */
import { SessionsController } from './api/controllers/session.controller';
import { SessionsService } from './domain/services/sessions.service';
import { SessionsRepository } from './infra/repositories/sessions.repository';
import { SessionSchema } from './infra/schemas/sessions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Session',
        schema: SessionSchema,
      },
    ]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService, SessionsRepository],
})
export class SessionsModule {}
