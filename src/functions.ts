import { ECondition, IAuction } from './types/Auction';
import { EUserType } from './types/User';

const getRandomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomBoolean = (): boolean => Math.random() > 0.5;

const makeArray = [
  'BMW',
  'Mercedes',
  'Audi',
  'Opel',
  'Renault',
  'Peugeot',
  'Citroen',
  'Skoda',
  'Seat',
  'Ford',
  'Fiat',
  'Volkswagen',
];
const modelArray = ['Model1', 'Model2', 'Model3'];
const fuelTypeArray = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const transmissionArray = ['Manual', 'Automatic', 'Semi-Automatic'];
const drivetrainArray = ['FWD', 'RWD', 'AWD', '4WD'];
const bodyTypeArray = ['Sedan', 'Hatchback', 'SUV', 'Convertible'];
const colorArray = ['Red', 'Blue', 'Black', 'White', 'Green', 'Yellow'];

export const generateAuction = (id: number, sellerId: number): IAuction => ({
  id,
  startingPrice: getRandomInt(10000, 50000),
  currentPrice: getRandomInt(50000, 100000),
  make: getRandomElement(makeArray),
  model: getRandomElement(modelArray),
  year: getRandomInt(2000, 2023),
  mileage: getRandomInt(0, 200000),
  engineCapacity: parseFloat((0.9 + Math.random() * 2.0).toFixed(1)),
  fuelType: getRandomElement(fuelTypeArray),
  power: getRandomInt(60, 200),
  transmission: getRandomElement(transmissionArray),
  drivetrain: getRandomElement(drivetrainArray),
  vin: Math.random().toString(36).substring(2, 17).toUpperCase(),
  bodyType: getRandomElement(bodyTypeArray),
  doorCount: getRandomInt(2, 5),
  seatCount: getRandomInt(2, 7),
  color: getRandomElement(colorArray),
  accidentFree: getRandomBoolean(),
  servicedAtDealer: getRandomBoolean(),
  condition: getRandomElement([ECondition.New, ECondition.Used]),
  description: 'A well-maintained car, perfect for all your needs.',
  sellerId,
  gallery: [
    `https://example.com/car${id * 2 - 1}.jpg`,
    `https://example.com/car${id * 2}.jpg`,
  ],
});

export const translateUserType = (userType: EUserType): string => {
  switch (userType) {
    case EUserType.Seller:
      return 'Wystawiający';
    case EUserType.Buyer:
      return 'Kupujący';
    default:
      return '';
  }
};

export const translateCondition = (condition: ECondition): string => {
  switch (condition) {
    case ECondition.New:
      return 'Nowy';
    case ECondition.Used:
      return 'Używany';
    default:
      return '';
  }
};
