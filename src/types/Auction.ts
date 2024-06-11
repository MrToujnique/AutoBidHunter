export enum ECondition {
  New = 'new',
  Used = 'used',
}

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
