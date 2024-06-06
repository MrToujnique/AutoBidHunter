import { z } from 'zod';

const envVariables = z.object({
  POSTGRES_DATABASE: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PRISMA_URL: z.string(),
  POSTGRES_URL: z.string(),
  POSTGRES_URL_NON_POOLING: z.string(),
  POSTGRES_URL_NO_SSL: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PORT: z.number(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
