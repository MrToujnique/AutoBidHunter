import { insertAuctions } from '@/lib/db';
import { TNewAuction } from '@/types/Auction';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

async function main() {
  const auctionValues = Array.from({ length: 10 }).map(
    (_, index) =>
      ({
        startingPrice: (10000 + index * 500).toString(),
        currentPrice: (11000 + index * 500).toString(),
        make: 'Toyota',
        model: `Model ${index + 1}`,
        year: 2020 + index,
        mileage: 10000 * index,
        engineCapacity: '2.0L',
        fuelType: 'petrol',
        power: 150 + index * 10,
        transmission: 'automatic',
        drivetrain: 'FWD',
        vin: `VIN12345${index}`,
        bodyType: 'sedan',
        doorCount: 4,
        seatCount: 5,
        color: 'Red',
        isAccidentFree: true,
        isServicedAtDealer: false,
        isNew: false,
        description: `Opis aukcji ${index + 1}`,
        userId: 1,
      } as TNewAuction),
  );

  try {
    await insertAuctions(auctionValues);
  } catch (error) {
    console.log('An error occurred during seeding the database: ', error);
  }

  // cleaning db
  // await cleanDb();

  process.exit();
}

main();
