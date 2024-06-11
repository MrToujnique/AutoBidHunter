export enum EUserType {
  Seller = 'seller',
  Buyer = 'buyer',
}

export interface IUser {
  id: number;
  firstName: string;
  userType: EUserType;
  phoneNumber: string;
  location: string;
  isCompany: boolean;
  email: string;
}
