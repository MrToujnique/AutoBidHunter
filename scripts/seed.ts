import { TNewAuction, TNewUser, insertAuction, insertUser } from '@/lib/db';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

async function main() {
  const newUser: TNewUser = {
    firstName: 'Bogusław',
    userType: 'seller',
    phoneNumber: '123-456-789',
    location: 'Warszawa',
    isCompany: false,
    email: 'boguslaw.kowalski@example.com',
  };

  const insertedUser = await insertUser(newUser);
  console.log('Inserted user:', insertedUser);

  const newAuction: TNewAuction = {
    startingPrice: '5000',
    currentPrice: '5000',
    make: 'Fiat',
    model: 'Cinquecento',
    year: 1998,
    mileage: 120000,
    engineCapacity: '899',
    fuelType: 'petrol',
    power: 39,
    transmission: 'manual',
    drivetrain: 'FWD',
    vin: 'ZFA12300000000000',
    bodyType: 'hatchback',
    doorCount: 3,
    seatCount: 5,
    color: 'red',
    accidentFree: 'yes',
    servicedAtDealer: 'no',
    condition: 'used',
    description:
      'A well-maintained Fiat Cinquecento in good condition, perfect for city driving.',
  };

  const res = await insertAuction(newAuction);
  console.log('Inserted auction:', res);
  process.exit();
}

main();
