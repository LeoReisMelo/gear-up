import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Env } from '@infra/config/env';
import { DatabaseConnection } from './connection';

@Module({
  imports: [
    MongooseModule.forRoot(Env.database.uri, {
      dbName: Env.database.name,
      autoIndex: true,
    }),
  ],
  providers: [DatabaseConnection],
  exports: [DatabaseConnection],
})
export class DatabaseModule {}
