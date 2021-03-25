import { Room } from '../../../room/room';
import { BankAccount } from './BankAccount';
import { BusinessServiceDtoList } from './businessServiceDtoList';
import { MobileWallet } from './mobileWallet';
import { Address } from '../../../property/address';
import { SubscriptionList } from './subscriptionList';

export class Property {
  name: string;
  id: number;
  businessDescription: string;
  businessShortDescription: string;
  businessName: string;
  businessType: string;
  businessTypeGroup: string;
  email: string;
  firstName: string;
  lastName: string;
  landphoneNumber: string;
  landphone: string;
  mobileNumber: string;
  organisationId: number;
  userStatus: string;
  username: string;
  password: string;
  confirmPassword: string;
  dashboardUrl: string;
  plan: string;
  newBusinessType: string;
  address: Address;
  facebook: string;
  instagram: string;
  twitter: string;
  gstNumber: string;
  imageUrl: string;
  bookOneRating: number;
  minimumRoooPrice: number;
  imageList: [
    {
      description: string,
      id: string,
      mainImage: true,
      name: string,
      url: string
    }
  ];
  longitude: string;
  latitude: string;
  seoFriendlyName: string;
  localCurrency: string;
  logoUrl: string;
  managerContactNo: string;
  managerEmailAddress: string;
  managerFirstName: string;
  managerLastName: string;
  maximumOccupancy: number;
  minimumOccupancy: number;
  mobile: string;
  noOfFloor: number;
  noOfBookOneReview: number;
  noOfRoomType: number;
  placeId: string;
  paymentGateway: string;
  paymentGatewayApiKey: string;
  paymentGatewayApiToken: string;
  paymentGatewayPublicKey: string;
  priceFortNight: number;
  priceMonthly: number;
  pricePerNight: number;
  pricePerWeek: number;
  propertyBarCode: string;
  propertyStatus: string;
  shortName: string;
  slogan: string;
  subscriptionList: SubscriptionList[];
  website: string;
  whatsApp: string;
  businessServiceDtoList: BusinessServiceDtoList[];
  roomList: Room[];
  bankAccount : any;
  mobileWallet : MobileWallet;

  taxDetails:  [
    {
      country: string,
      name: string,
      percentage: number,
      state: string,
      taxAmount: number,
      taxSlabsList: [
        {
          maxAmount: number,
          minAmount: number,
          percentage: number
        }
      ],
      taxableAmount: number
    }
  ];
    constructor() { }
}
