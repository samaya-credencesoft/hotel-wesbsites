import { Address } from "./address";
export class Booking {
  id: number;
  referenceNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  checkInDateStr: string;
  checkOutDateStr: string;
  fromDate: string;
  fromDateCal: Date;
  toDate: string;
  roomType: string;
  roomPrice: number;
  airportShuttlePrice: string;
  customerId: number;
  customerAddress: Address;
  customerCompanyName: string;
  businessEmail: string;
  businessName: string;
  notes: string;
  externalBookingID: string;
  noOfNights: number;
  noOfKids: number;
  noOfPets: number;
  referralCode: string;
  referredBy: number;
  roleName: string;
  externalSite: string;
  paymentId: number;
  paymentSurcharge: string;
  airportService: string;
  accomodationType: string;
  propertyReservationNumber: string;
  roomId: number;
  propertyId: number;
  available: Boolean;
  modeOfPayment: string;
  cardNumber: number;
  expMonth: number;
  expYear: number;
  cvv: number;
  currency: string;
  token: string;
  bookingAmount: number;
  payableAmount: number;
  roomName: string;
  extraChildCharge: number;
  extraPersonCharge: number;
  outstandingAmount: number;
  discountAmount: number;
  discountPercentage: number;
  commissionAmount: string;
  gstAmount: number;
  taxPercentage: number;
  netAmount: number;
  totalAmount: number;
  totalServiceAmount: number;
  totalExpenseAmount: number;
  totalPaymentAmount: number;
  bookingStatus: string;
  invoiceUrl: string ;
  noOfRooms: number;
  noOfPersons: number;
  noOfChildren: number;
  noOfExtraPerson: number;
  managerContactNo: string;
  roomBooking: boolean;
  groupBooking: boolean;
  createdDate: string;
  lastModifiedDate: string;
  roomRatePlanName: string;
  planCode: string;
  noOfExtraChild: number;
  customerDtoList: any[];
  taxAmount: number;
  constructor() {}
}
