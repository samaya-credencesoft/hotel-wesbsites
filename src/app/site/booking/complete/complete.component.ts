
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Room } from 'src/app/room/room';
import { PROPERTY_ID, ApiService } from 'src/app/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { DateModel } from './../../home/model/dateModel';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Booking } from '../../home/model/booking';
import { FormControl, FormGroup, NgForm, FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
import { Payment } from '../../home/model/payment';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { BankAccount } from '../../home/model/BankAccount';
import { BusinessServiceDtoList } from '../../home/model/businessServiceDtoList';
import { Customer } from '../../home/model/customer';
import { MobileWallet } from '../../home/model/mobileWallet';
import { TokenStorage } from 'src/app/token.storage';
import { Property } from 'src/app/site/home/model/property';
import { MessageDto } from '../../home/model/MessageDto';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {

  currency: string;

  showAlert: boolean = false;
  alertType: string;

  verifyOption = "email";
  // smsOption: string = '';
  sendBtn = "Send";
  submitButtonDisable: boolean = false;
  loader = false;
  verificationCode: string;
  lookup = false;
  checkCustomerLookup = false;
  customerVerified = false;
  verificationSend = false;
  paymentLoader: boolean = false;
  verified = false;
  customerExist = false;
  verifiedPending: boolean = false;
  verifySuccessMessage: boolean = false;
  isReservationList: boolean = false;
  headerTitle: string;
  bodyMessage: string;
  payment: Payment;
  homeDelivery = false;
  cashPayment = false;

  isSuccess: boolean;
  property: Property;
  // totalQuantity: number ;
  // totalPrice: number;
  myDate: any;
  message: MessageDto;
  // slotReservation: SlotReservation;
  // slotReservations: SlotReservation[];
  businessServiceDto: BusinessServiceDtoList;
  customerDto: Customer;
  // payment: Payment;
  prepareDay: number;
  prepareHour: number;
  prepareMinute: number;

  leadHour: number;
  leadDay: number;
  leadMin: number;

  leadMaxDay: number;
  leadMaxMin: number;
  leadMaxHour: number;

  contentDialog: any;

  ngbDate: any;
  mobileHasError: boolean = true;
  taxPercentage = 0;
  subTotalAmount: number = 0;
  totalAmount: number = 0;
  bookingData: any;
  booking: Booking;
  timeDifferenceInDays: number;

  isVerified: boolean = false;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  roomsAndOccupancy: boolean = false;
  bookingCity: string;
  adults: number = 2;
  children: number = 0;
  noOfrooms: number = 1;
  DiffDate;
  enddate;
  startDate;
  bookingConfirmed = false;

  bankAccount: BankAccount;
  mobileWallet: MobileWallet;
  // businessOfferDto: BusinessOfferDto;
  promoCode : string;
  discountPercentage: number;
  promoMessage = "";

  private ewaySecureFieldCode: string;
  private ewayErrors: string = null;
  private ewayInitComplete: boolean = false;


  daySelected: string;
  yearSelected: string;
  monthSelected: number;

  daySelected2: string;
  yearSelected2: string;
  monthSelected2: number;


  currentDay: string;

  monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(
    private token: TokenStorage,
    private locationBack: Location,
    private changeDetectorRefs: ChangeDetectorRef,
    private apiService: ApiService,
    private router: Router,
    private acRoute: ActivatedRoute, )
  {
    this.myDate = new Date();
    this.businessServiceDto = new BusinessServiceDtoList();
    this.property = new Property();
    this.booking = new Booking();
    this.payment = new Payment();
    this.mobileWallet = new MobileWallet();
    this.bankAccount = new BankAccount();
    this.customerDto = new Customer();
    if (this.token.getBookingData() !== null) {
      this.bookingData = this.token.getBookingData();
      this.booking = this.bookingData;
      this.fromDate = new NgbDate(
        this.mileSecondToNGBDate(this.booking.fromDate).year,
        this.mileSecondToNGBDate(this.booking.fromDate).month,
        this.mileSecondToNGBDate(this.booking.fromDate).day
      );
      this.toDate = new NgbDate(
        this.mileSecondToNGBDate(this.booking.toDate).year,
        this.mileSecondToNGBDate(this.booking.toDate).month,
        this.mileSecondToNGBDate(this.booking.toDate).day
      );
      this.adults = this.booking.noOfPersons;
      this.children = this.booking.noOfExtraPerson;
      this.noOfrooms = this.booking.noOfRooms;
    }
    // if (this.token.getBookingCity() !== null) {
    //   this.bookingCity = this.token.getBookingCity();
    // }
    // this.bookingData = this.token.getBookingData();
    // this.booking = this.bookingData;
    // this.calculateDateDeference();
    this.getDiffDate(this.toDate, this.fromDate);
  }

 ngOnInit()
 {
  if (this.token.getBookingData() != undefined) {
    this.booking = this.token.getBookingData();

    // this.room = this.dateModel.room;
    // this.booking = this.dateModel.booking;

    this.getCheckInDateFormat(this.booking.fromDate);
    this.getCheckOutDateFormat(this.booking.toDate);

    this.booking.businessEmail = this.booking.email;
    // this.booking.fromDate = this.dateModel.checkIn;
    // this.booking.toDate = this.dateModel.checkOut;
    // this.booking.roomId = this.room.id;
    this.booking.propertyId = PROPERTY_ID;
    // this.checkAvailabilty();
  }
  if (this.token.getProperty() != undefined) {
  this.property = this.token.getProperty();

  this.bankAccount= this.property.bankAccount;
  this.mobileWallet= this.property.mobileWallet;
  }
 }
 mileSecondToNGBDate(date: string) {
  const dsd = new Date(date);
  const year = dsd.getFullYear();
  const day = dsd.getDate();
  const month = dsd.getMonth() + 1;
  return { year: year, month: month, day: day };
}
getDiffDate(toDate, fromDate) {
  this.enddate = new Date(toDate.year, toDate.month - 1, toDate.day);

  this.startDate = new Date(fromDate.year, fromDate.month - 1, fromDate.day);
  // console.log('this.fromDate: ', this.startDate);
  // console.log('this.toDate: ', this.enddate);
  this.DiffDate = Math.floor(
    (Date.UTC(
      this.enddate.getFullYear(),
      this.enddate.getMonth(),
      this.enddate.getDate()
    ) -
      Date.UTC(
        this.startDate.getFullYear(),
        this.startDate.getMonth(),
        this.startDate.getDate()
      )) /
      (1000 * 60 * 60 * 24)
  );
}
 getCheckInDateFormat(dateString: string)
 {
   var yearAndMonth = dateString.split("-", 3);
   this.daySelected = String(yearAndMonth[2].split(" ", 1));
   this.yearSelected = yearAndMonth[0];
   this.monthSelected = parseInt(yearAndMonth[1]) - 1;
 }

 getCheckOutDateFormat(dateString: string)
 {
   var yearAndMonth = dateString.split("-", 3);
   this.daySelected2 = String(yearAndMonth[2].split(" ", 1));
   this.yearSelected2 = yearAndMonth[0];
   this.monthSelected2 = parseInt(yearAndMonth[1]) - 1;
 }


 toggleRoomsAndOccupancy() {
  if (this.roomsAndOccupancy == false) {
    this.roomsAndOccupancy = true;
  } else if (this.roomsAndOccupancy == true) {
    this.roomsAndOccupancy = false;
  }
}
onReload() {
  window.location.reload(true);
}
calculateDateDeference() {
  // Here are the two dates to compare
  let date1 = this.booking.fromDate;
  let date2 = this.booking.toDate;

  // First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
  let date1a = date1.split("-");
  let date2a = date2.split("-");

  // Now we convert the array to a Date object, which has several helpful methods
  let date1b = new Date(
    Number(date1a[0]),
    Number(date1a[1]) + 1,
    Number(date1a[2])
  );
  let date2b = new Date(
    Number(date2a[0]),
    Number(date2a[1]) + 1,
    Number(date2a[2])
  );

  // We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
  const date1_unixtime = Number(date1b.getTime() / 1000);
  const date2_unixtime = Number(date2b.getTime() / 1000);

  // This is the calculated difference in seconds
  const timeDifference = date2_unixtime - date1_unixtime;

  // in Hours
  const timeDifferenceInHours = timeDifference / 60 / 60;

  // and finaly, in days :)
  this.timeDifferenceInDays = timeDifferenceInHours / 24;
}
getPropertyDetails(id: number) {
  this.loader = true;
  this.apiService.getPropertyDetailsByPropertyId(id).subscribe(
    (data) => {
      this.property = data.body;
      this.currency = this.property.localCurrency.toUpperCase();
      this.mobileWallet = this.property.mobileWallet;
      this.bankAccount = this.property.bankAccount;
      //  console.log(' this.property ===='+JSON.stringify( this.property));
      if (this.property.taxDetails.length > 0) {
        this.taxPercentage = this.property.taxDetails[0].percentage;
      }
      if (this.property.taxDetails[0].taxSlabsList.length > 0) {
        this.property.taxDetails[0].taxSlabsList.forEach((element) => {
          if (
            element.maxAmount > this.booking.roomPrice &&
            element.minAmount < this.booking.roomPrice
          ) {
            this.taxPercentage = element.percentage;
          } else if (element.maxAmount < this.booking.roomPrice) {
            this.taxPercentage = element.percentage;
          }
        });
      }

      this.booking.totalAmount = this.booking.netAmount + ((this.booking.netAmount * this.taxPercentage) / 100) - this.booking.discountAmount;

      this.businessServiceDto = this.property.businessServiceDtoList.find(
        (data) => data.name === this.property.businessType
      );

      this.loader = false;
    },
    (_error) => {
      this.loader = false;
    }
  );
}

clickPhone() {
  this.booking.email = "";
}

clickEmail() {
  this.booking.mobile = "";
}
checkCustomer() {
  this.loader = true;

  if (this.verifyOption == "email") {
    this.message.email = this.booking.email;
    this.message.toNumber = null;
  } else if (this.verifyOption == "sms") {
    this.message.toNumber = this.booking.mobile;
    this.message.email = null;
  }

  this.sendBtn = "Resend";
  this.apiService.authorisationToken(this.message)
    .subscribe((response) => {
      this.loader = false;
      console.log("authorisationToken data", JSON.stringify(response));
      const data: any = response;
      this.message.verificationStatus = data.verificationStatus;
      this.message.sid = data.sid;
      this.message.notificationStatus = data.notificationStatus;
    }),
    (error) => {
      this.loader = false;
    };
  // console.log('authorisationToken data', JSON.stringify(this.message));
  this.lookup = true;
  this.loader = false;
  this.verificationSend = true;
}
phoneHasError(obj) {
  console.log(JSON.stringify(obj));
  this.mobileHasError = obj;
}
getNumber(obj) {
  console.log(JSON.stringify(obj));
  this.booking.mobile = obj;
}
onVerified() {
  this.isVerified = true;
}
mobileTextChange() {
  this.mobileHasError = true;
  this.isVerified = false;
}
customerLookup() {
  if (this.verifyOption == "email") {
    this.apiService
      .getCustomerDetailsByEmail(this.booking.email)
      .subscribe(
        (data) => {
          this.bookingData.customerDtoList = [];
          // console.log('Get customer ' + JSON.stringify(data.body));
          this.booking.firstName = data.body.firstName;
          this.booking.lastName = data.body.lastName;
          this.booking.mobile = data.body.mobile;
          this.bookingData.customerDtoList.push(data.body);
          this.booking.customerId = this.bookingData.customerDtoList[0].id;
          this.lookup = true;
          this.customerExist = true;
          this.verified = true;
        },
        (_error) => {
          this.loader = false;
          this.lookup = true;
          this.customerExist = false;
        }
      );
  } else if (this.verifyOption == "sms") {
    this.apiService
      .getCustomerDetailsByMobile(this.booking.mobile)
      .subscribe(
        (data) => {
          this.bookingData.customerDtoList = [];
          //  console.log('Get customer ' + JSON.stringify(data.body));
          this.booking.firstName = data.body.firstName;
          this.booking.lastName = data.body.lastName;
          // this.booking.mobile = data.body.mobile;
          this.booking.email = data.body.email;
          this.bookingData.customerDtoList.push(data.body);
          this.booking.customerId = this.bookingData.customerDtoList[0].id;
          this.lookup = true;
          this.customerExist = true;
          this.verified = true;
        },
        (_error) => {
          this.loader = false;
          this.lookup = true;
          this.customerExist = false;
        }
      );
  }
}
varificationSend() {
  this.loader = true;

  if (this.verifyOption == "email") {
    this.message.email = this.booking.email;
    this.message.toNumber = null;
  } else if (this.verifyOption == "sms") {
    this.message.toNumber = this.booking.mobile;
    this.message.email = null;
  }
  this.message.verificationCode = this.verificationCode;
  this.apiService.verifyAuthorisationToken(this.message).subscribe(
    (response) => {
      this.loader = false;

      const data: any = response;
      this.message.verificationStatus = data.verificationStatus;
      this.message.notificationStatus = data.notificationStatus;
      if (data.verificationStatus === "approved") {
        this.verifiedPending = false;
        this.verified = true;
        this.verifySuccessMessage = true;
        setTimeout(function () {
          this.verifySuccessMessage = false;
        }, 5000);
      } else if (data.verificationStatus === "pending") {
        this.isSuccess = false;
        this.verifiedPending = true;
        this.verified = false;
        this.verifySuccessMessage = true;
        setTimeout(function () {
          this.verifySuccessMessage = false;
        }, 5000);
      } else {
        this.verified = false;
      }
    },
    (_error) => {
      this.loader = false;
    }
  );
}

}
