import {
  boolean,
  decimal,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const userTypeEnum = pgEnum('user_type', ['seller', 'buyer']);
export const conditionEnum = pgEnum('condition', ['new', 'used']);

export const users = pgTable('user', {
  id: serial('id'),
  firstName: text('first_name'),
  userType: userTypeEnum('user_type'),
  phoneNumber: text('phone_number'),
  location: text('location'),
  isCompany: boolean('is_company').default(false),
  email: text('email').unique(),
});

export const auctions = pgTable('auction', {
  id: serial('id'),
  startingPrice: text('starting_price'),
  currentPrice: text('current_price'),
  make: text('make'),
  model: text('model'),
  year: serial('year'),
  mileage: serial('mileage'),
  engineCapacity: text('engine_capacity'),
  fuelType: text('fuel_type'),
  power: serial('power'),
  transmission: text('transmission'),
  drivetrain: text('drivetrain'),
  vin: text('vin'),
  bodyType: text('body_type'),
  doorCount: serial('door_count'),
  seatCount: serial('seat_count'),
  color: text('color'),
  accidentFree: text('accident_free'),
  servicedAtDealer: text('serviced_at_dealer'),
  condition: conditionEnum('condition'),
  description: text('description'),
});

export const bids = pgTable('bid', {
  id: serial('id'),
  amount: decimal('amount').notNull(),
  auctionId: integer('auction_id').references(() => auctions.id),
  bidderId: integer('bidder_id').references(() => users.id),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const wonAuctions = pgTable('won_auction', {
  id: serial('id'),
  auctionId: integer('auction_id').references(() => auctions.id),
  winnerId: integer('winner_id').references(() => users.id),
  invoicePdf: text('invoice_pdf'),
  createdAt: timestamp('created_at').notNull(),
});

export const favorites = pgTable('favorite', {
  id: serial('id'),
  userId: integer('user_id').references(() => users.id),
  auctionId: integer('auction_id').references(() => auctions.id),
  createdAt: timestamp('created_at').notNull(),
});

export const messages = pgTable('message', {
  id: serial('id'),
  senderId: integer('sender_id').references(() => users.id),
  receiverId: integer('receiver_id').references(() => users.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull(),
});
