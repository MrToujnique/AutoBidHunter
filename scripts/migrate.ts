import { db } from '@/lib/db';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

async function main() {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL is missing');
  }

  try {
    await migrate(db, { migrationsFolder: './drizzle' });
  } catch (error) {
    console.log('Error during migration: ', error);
  }
}

main();
