import { Customer } from "./customer";


export class Booking {

  id: number;
  referenceNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  fromDate: string;
  fromDateCal: Date;
  toDate: string;
  roomType: string;
  roomPrice: number;
  airportShuttlePrice: string;
  customerId: number;
  customerDtoList: Customer[];
  businessEmail: string;
  businessName: string;
  notes: string ;
  externalBookingID: string;
  externalSite: string;
  commissionAmount: string;
  gstAmount: number;
  paymentId: number;
  paymentSurcharge: string ;
  netAmount: number;
  discountPercentage: number;
  airportService: string;
  accomodationType: string;
  propertyReservationNumber: string;
  roomId: number;
  propertyId: number;
  available: Boolean ;
  modeOfPayment: string ;
  cardNumber: number;
  expMonth: number;
  expYear: number;
  cvv: number;
  currency: string;
  token: string ;
  bookingAmount: number ;
  payableAmount: number ;
  roomName: string ;
  totalServiceAmount: number ;
  totalExpenseAmount: number ;
  totalPaymentAmount: number ;
  outstandingAmount: number ;
  discountAmount: number;
  totalAmount: number;
  bookingStatus: string;
  invoiceUrl: string ;
  noOfRooms: number;
  noOfPersons: number;
  noOfExtraPerson: number;
  managerContactNo: string;
  extraPersonCharge: number;
  taxPercentage: number;
  roomBooking: boolean;
  groupBooking: boolean;
  createdDate:string;
  lastModifiedDate: string;
  roomRatePlanName: string;
  taxAmount: number;
  planCode: string;
  constructor() { }
}
