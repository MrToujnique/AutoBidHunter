import * as schema from '../lib/schema';

export type TNewUser = typeof schema.users.$inferInsert;
