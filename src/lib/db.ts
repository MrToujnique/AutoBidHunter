import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from './schema';
import { sql } from '@vercel/postgres';
import { auctions, users, bids } from './schema';
import { TNewUser } from '@/types/User';
import { IUpdateAuctionBidInput, TNewAuction } from '@/types/Auction';
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

export const updateAuctionBid = async ({
  auctionId,
  amount,
  userId,
  endsAt,
  timeLeft,
}: IUpdateAuctionBidInput) => {
  try {
    let newEndsAt: Date | null = null;

    if (timeLeft && timeLeft > 0 && timeLeft <= 120000) {
      newEndsAt = new Date(Date.now() + 2 * 60 * 1000);

      await db
        .update(auctions)
        .set({
          currentPrice: amount,
          endsAt: newEndsAt,
        })
        .where(eq(auctions.id, auctionId));
    }

    await db
      .update(auctions)
      .set({ currentPrice: amount })
      .where(eq(auctions.id, auctionId));

    await db.insert(bids).values({
      amount,
      auctionId,
      bidderId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { currentPrice: amount, endsAt: newEndsAt || new Date(endsAt) };
  } catch (error) {
    return error;
  }
};
