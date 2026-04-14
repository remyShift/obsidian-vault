import { z } from 'zod';

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(1),
  S3_BUCKET: z.string().min(1),
  S3_ACCESS_KEY_ID: z.string().min(1),
  S3_SECRET_ACCESS_KEY: z.string().min(1),
  S3_REGION: z.string().min(1),
  BASE_FRONTEND_URL: z.url(),
  CDN_URL: z.url(),
  LEGACY_DB_URI: z.string().default('mongodb://localhost:27017'),
});

const _parsed = serverEnvSchema.safeParse(process.env);

if (!_parsed.success) {
  const formatted = _parsed.error.issues
    .map((issue) => `  • ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');
  throw new Error(`Invalid server environment variables:\n${formatted}`);
}

export const serverEnv = _parsed.data;
export type TServerEnv = z.infer<typeof serverEnvSchema>;
