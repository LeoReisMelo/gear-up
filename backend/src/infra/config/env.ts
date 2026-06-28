import { z } from 'zod';
import dotenv from 'dotenv';
import { logger } from '@infra/logger/logger';
import { DOIS, UM } from '@shared/constants/magic-numbers';

dotenv.config();

logger.log('Loading environment variables...');

const envSchema = z.object({
  node: z.object({
    env: z.enum(['development', 'production', 'test']).default('development'),
    port: z.coerce.number().default(3000),
  }),
  database: z.object({
    uri: z.string().min(UM, 'DATABASE_URI is required'),
    name: z.string().min(UM, 'DATABASE_NAME is required'),
  }),
  redis: z.object({
    host: z.string().default('localhost'),
    port: z.coerce.number().default(6379),
  }),
  auth: z.object({
    jwtSecret: z.string().min(UM, 'JWT_SECRET is required'),
    jwtExpiresIn: z.coerce.number().default(DOIS),
    jwtRefreshExpiresIn: z.string().default('7d'),
  }),
});

export type Env = z.infer<typeof envSchema>;

const rawEnv = {
  node: {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
  },
  database: {
    uri: process.env.DATABASE_URL,
    name: process.env.DATABASE_NAME,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};

const parsed = envSchema.safeParse(rawEnv);

/**
 * ❌ FAIL FAST LIMPO (SEM STACK TRACE)
 */
if (!parsed.success) {
  logger.error('ENV VALIDATION FAILED');

  logger.error(
    JSON.stringify(
      parsed.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
      null,
      DOIS,
    ),
  );

  process.exit(UM);
}

/**
 * ✔ SAFE EXPORT
 */
export const Env: Env = parsed.data;

/**
 * ✅ SUCCESS LOGS
 */
logger.log('ENV LOADED SUCCESSFULLY');
logger.verbose(`Environment: ${Env.node.env}`);
