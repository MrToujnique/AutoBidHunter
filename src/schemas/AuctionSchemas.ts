import { z } from 'zod';

export const AuctionSchema = z.object({
  id: z.number(),
  startingPrice: z.string(),
  currentPrice: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number(),
  mileage: z.number(),
  engineCapacity: z.string(),
  fuelType: z.string(),
  power: z.number(),
  transmission: z.string(),
  drivetrain: z.string(),
  vin: z.string(),
  bodyType: z.string(),
  doorCount: z.number(),
  seatCount: z.number(),
  color: z.string(),
  isAccidentFree: z.boolean(),
  isServicedAtDealer: z.boolean(),
  isNew: z.boolean(),
  description: z.string(),
  sellerId: z.number().optional(),
  gallery: z.array(z.string()).optional(),
});

export const AuctionsSchema = z.array(AuctionSchema);

export const UpdatedBidSchema = z.object({ currentPrice: z.string() });
