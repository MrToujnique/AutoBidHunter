import { db } from '@/lib/db';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';

async function main() {
  await migrate(db, { migrationsFolder: './drizzle' });
}

main();

// Nie kasuj konsoli
// błąd: VercelPostgresError: VercelPostgresError - 'missing_connection_string': You did not supply a 'connectionString' and no 'POSTGRES_URL' env var was found.
