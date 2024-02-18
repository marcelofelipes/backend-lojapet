import { z } from 'zod';
const envSchema = z.object({
  PORT: z.number().default(3000),
  HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z.string().default('development'),
  DATABASE_URL: z.string(),
  API_KEY: z.string().default('dev-api-key'),
});

export type Env = z.infer<typeof envSchema>;
export const env: Env = envSchema.parse(process.env);