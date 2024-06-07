import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from './schema';
import { sql } from '@vercel/postgres';
import { auctions, users } from './schema';

export const db = drizzle(sql, { schema });

export type TNewUser = typeof schema.users.$inferInsert;
export type TNewAuction = typeof schema.auctions.$inferInsert;

export const insertUser = async (user: TNewUser) => {
  return db.insert(users).values(user).returning();
};

export const getAuctions = async () => {
  const selectResult = await db.select().from(auctions);
  console.log('selectResult', selectResult);
  return selectResult;
};

export const insertAuction = async (auction: TNewAuction) => {
  return db.insert(auctions).values(auction).returning();
};
