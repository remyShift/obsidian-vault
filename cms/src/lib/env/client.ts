import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_PAYLOAD_URL: z.url(),
});

const _parsed = clientEnvSchema.safeParse({
  NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
});

if (!_parsed.success) {
  const formatted = _parsed.error.issues
    .map((issue) => `  • ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');
  throw new Error(`Invalid client environment variables:\n${formatted}`);
}

export const clientEnv = _parsed.data;
export type TClientEnv = z.infer<typeof clientEnvSchema>;
