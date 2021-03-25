import { Address } from "node:cluster";
import { BankAccount } from "./BankAccount";
import { BusinessServiceDtoList } from "./businessServiceDtoList";
import { MobileWallet } from "./mobileWallet";
import { TaxDetails } from "./TaxDetails";

export class Property {

    bookonePropertyId : number;
    id: number;
    name: string;
    email: string;
    managerName: string;

    longitude : string;
    latitude :string;

    address: Address;
    contactNumber: string;
    landphone: string;
    mobile: string ;
    status: string;
    gstNumber: string;
    userId: string;
    propertyBarCode: Uint8Array[] ;
    logoUrl: string ;
    imageUrl: string;
    website: string;
    slogan: string ;

    localCurrency: string;
    propertyStatus : string;
    pricePerNight : string;
    pricePerWeek: string;
    priceFortNight: string;
    priceMonthly:string;
    minimumOccupancy:string;
    maximumOccupancy:string;

    managerFirstName: string;
    managerLastName: string;
    managerContactNo: string;
    managerEmailAddress: string ;

    taxDetails : TaxDetails[];

    noOfFloor: number;
    noOfRoomType: number;
    placeId: string;
    organisationId : number;


    businessName: string;

    confirmEmail: string;
    password: string;
    uuid : string;
    resetStatus : boolean;
    passwordResetLink : string;
    confirmPassword: string;
    username: string;
    mobileNumber : string;
    landphoneNumber: string;
    firstname: string; // firstname
    lastname:string; // lastname
  // propertie :GroupUser;
    propertyId : number;
    createdBy : string;
    shortName : string;

    businessType : string;
    businessDescription : string;

    plan : string;

    twitter	: string;
    instagram :	string;
    facebook	: string;
    seoFriendlyName :	string;

    bookingCommissionPercentage :	number;
    transactionFee	: number;
    cardProcessingFeePercentage : number;

    paymentGateway: string;
    paymentGatewayApiKey :string;
    paymentGatewayApiToken :string;
    paymentGatewayPublicKey: string;

    businessServiceDtoList : BusinessServiceDtoList[];

    imageList : [{
      id: number;
      description	:string;
      mainImage :	boolean;
      name :	string;
      url :	string;
    }];

    bankName : string;
    branchName : string;
    verified : boolean;
    bankAccount : BankAccount;
    featuredBusiness : boolean;

    socialMediaLinks : any[];

    numberOfRooms : number;

    mobileWallet : MobileWallet;
    detailedView: {
      totalNumberOfVisits : number;
      yearWiseVisits: any;
    }
    whatsApp: string;
    constructor() {
     }
}
