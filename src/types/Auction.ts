import { AuctionSchema } from '@/schemas/AuctionSchemas';
import * as schema from '../lib/schema';
import { z } from 'zod';

export enum ECondition {
  New = 'new',
  Used = 'used',
}

export type TAuction = z.infer<typeof AuctionSchema>;

export type TNewAuction = typeof schema.auctions.$inferInsert;

export type TFuelType = typeof schema.fuelTypeEnum;

export interface IAuction {
  id: number;
  startingPrice: number;
  currentPrice: number;
  make: string;
  model: string;
  year: number;
  mileage: number;
  engineCapacity: number;
  fuelType: string;
  power: number;
  transmission: string;
  drivetrain: string;
  vin: string;
  bodyType: string;
  doorCount: number;
  seatCount: number;
  color: string;
  accidentFree: boolean;
  servicedAtDealer: boolean;
  condition: ECondition;
  description: string;
  sellerId: number;
  gallery: string[];
}

export interface IAuctionSliceState {
  auctions: TAuction[];
  currentAuctionPrice: string;
}

export interface IUpdateAuctionBidInput {
  auctionId: number;
  amount: string;
  userId: number;
}
