import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from './schema';
import { sql } from '@vercel/postgres';
import { auctions, users } from './schema';
import { TNewUser } from '@/types/User';
import { TNewAuction } from '@/types/Auction';
import { eq } from 'drizzle-orm';

export const db = drizzle(sql, { schema });

export const insertUser = async (user: TNewUser) => {
  return db.insert(users).values(user).returning();
};

export const getAuctions = async () => {
  try {
    const selectResult = await db.select().from(auctions);
    return selectResult;
  } catch (error) {
    return error;
  }
};

export const getAuctionById = async (id: number) => {
  try {
    const selectResult = await db
      .select()
      .from(auctions)
      .where(eq(auctions.id, id));

    return selectResult[0];
  } catch (error) {
    return error;
  }
};

export const insertAuction = async (auction: TNewAuction) => {
  return db.insert(auctions).values(auction).returning();
};

export const insertAuctions = async (auction: TNewAuction[]) => {
  return db.insert(auctions).values(auction).returning();
};

export const cleanDb = async () => {
  await db.delete(auctions);
  await db.delete(users);
};
