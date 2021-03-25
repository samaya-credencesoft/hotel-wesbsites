import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/room/room';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { DateModel } from './../../home/model/dateModel';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Booking } from '../../home/model/booking';
import {
  FormControl,
  FormGroup,
  NgForm,
  FormGroupDirective,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { TokenStorage } from '../../../token.storage';
import { Payment } from 'src/app/payment/payment';
import { MessageDto } from '../../home/model/MessageDto';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../../home/model/customer';
import { Property } from 'src/app/site/home/model/property';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css'],
})
export class NewBookingComponent implements OnInit {
  rooms: Room[];
  room: Room;
  booking: Booking;
  dateModel: DateModel;
  daySelected: string;
  yearSelected: string;
  monthSelected: number;

  daySelected2: string;
  yearSelected2: string;
  monthSelected2: number;

  isAvailableChecked: boolean;
  currentDay: string;
  bookingConfirmed: boolean;

  currency: string;
  message: MessageDto;

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
  property: Property;
  isSuccess: boolean;

  mobileHasError: boolean = true;
  taxPercentage = 0;
  subTotalAmount: number = 0;
  totalAmount: number = 0;
  bookingData: any;
  customerDto: Customer;
  timeDifferenceInDays: number;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  roomsAndOccupancy: boolean = false;
  bookingCity: string;
  guest: number = 1;

  adults: number = 2;
  children: number = 0;
  noOfrooms: number = 1;

  isVerified = false;

  monthArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  firstName: FormControl = new FormControl('', Validators.required);
  lastName: FormControl = new FormControl('', Validators.required);
  bookingEmail: FormControl = new FormControl('', Validators.nullValidator);
  bookingContact: FormControl = new FormControl('', Validators.nullValidator);
  noOfPersons: FormControl = new FormControl('', Validators.required);
  noOfRooms: FormControl = new FormControl('', Validators.required);
  //termAndConditions : FormControl = new FormControl("",Validators.required);
  checkIn: FormControl = new FormControl();
  checkOut: FormControl = new FormControl();

  onBookingForm: FormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    bookingEmail: this.bookingEmail,
    bookingContact: this.bookingContact,
    noOfPersons: this.noOfPersons,
    noOfRooms: this.noOfRooms,
    // termAndConditions : this.termAndConditions,
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    public token: TokenStorage,
    private acRoute: ActivatedRoute
  ) {
    // this.dateModel = new DateModel();
    this.booking = new Booking();
    this.room = new Room();
    if (this.token.getProperty() != undefined && this.token.getProperty() != null) {
      this.property = this.token.getProperty();
    }

    if (this.token.getBookingData() != undefined && this.token.getBookingData() != null) {
      this.booking = this.token.getBookingData();

      console.log('this.booking : ', JSON.stringify(this.booking));

      if (
        this.booking.fromDate != undefined &&
        this.booking.toDate != undefined
      ) {
        this.isAvailableChecked = true;
        this.getCheckInDateFormat(this.booking.fromDate);
        this.getcheckOutDateFormat(this.booking.toDate);
      } else {
        this.isAvailableChecked = false;
        this.checkincheckOutDate();
      }
    }
    // });
  }

  ngOnInit() {

  }
  onBook() {
    this.dateModel = new DateModel();

    if (this.checkIn.value === null) {
      this.dateModel.checkIn = this.yearSelected + '-' + (this.monthSelected + 1) + '-' + this.daySelected;
    } else {
      this.dateModel.checkIn = this.getDateFormat(this.checkIn.value);
    }

    if (this.checkOut.value === null) {
      this.dateModel.checkOut = this.yearSelected2 + '-' + (this.monthSelected2 + 1) + '-' + this.daySelected2;
    } else {
      this.dateModel.checkOut = this.getDateFormat(this.checkOut.value);
    }
    if (this.guest === null) {
      this.dateModel.guest = 1;
    } else {
      this.dateModel.guest = this.guest;

    }

    this.dateModel.noOfRooms = 1;


    // console.log(' this.dateModel '+JSON.stringify( this.dateModel));

    const navigationExtras: NavigationExtras = {
      queryParams: {
        dateob: JSON.stringify(this.dateModel),
      }
    };

    this.router.navigate(['/booking/choose'], navigationExtras);
  }
  checkincheckOutDate() {
    let currentDate: Date = new Date();
    this.daySelected = this.getDay(currentDate);
    this.yearSelected = String(currentDate.getFullYear());
    this.monthSelected = currentDate.getMonth();

    let afterDate: Date = new Date();
    afterDate.setDate(currentDate.getDate() + 1);

    this.daySelected2 = this.getDay(afterDate);
    this.yearSelected2 = String(afterDate.getFullYear());
    this.monthSelected2 = afterDate.getMonth();
  }

  getDay(date: Date) {
    if (date.getDate().toString().length == 1) {
      this.currentDay = '0' + date.getDate();
    } else {
      this.currentDay = '' + date.getDate();
    }

    return this.currentDay;
  }
  onCheckoutSubmit() {

  }
  checkedOutEvent() {
    this.isAvailableChecked = false;
  }

  checkInEvent() {
    this.isAvailableChecked = false;
    let currentDate: Date = new Date(this.checkIn.value);

    let afterDate: Date = new Date();
    afterDate.setDate(currentDate.getDate() + 1);
    afterDate.setFullYear(currentDate.getFullYear());
    afterDate.setMonth(currentDate.getMonth());

    this.daySelected2 = this.getDay(afterDate);
    this.yearSelected2 = String(afterDate.getFullYear());
    this.monthSelected2 = afterDate.getMonth();
  }

  getRoomByDate() {
    if (this.checkIn.value === null) {
      this.booking.fromDate = this.yearSelected + '-' + this.monthSelected + 1 + '-' + this.daySelected;
    } else {
      this.booking.fromDate = this.getDateFormat(this.checkIn.value);
    }

    if (this.checkOut.value === null) {
      this.booking.toDate =
        this.yearSelected2 +
        '-' +
        this.monthSelected2 +
        1 +
        '-' +
        this.daySelected2;
    } else {
      this.booking.toDate = this.getDateFormat(this.checkOut.value);
    }

    if (
      this.booking.toDate != undefined &&
      this.booking.fromDate != undefined
    ) {
      this.isAvailableChecked = true;
    }
  }

  getDateFormat(dateString: string) {
    let yearAndMonth = dateString.split('-', 3);
    return (
      yearAndMonth[0] +
      '-' +
      yearAndMonth[1] +
      '-' +
      yearAndMonth[2].split(' ', 1)
    );
  }

  onChangeRoom($event, roomNumber: number) {
    if (this.booking.noOfRooms != undefined) {
      if (this.booking.noOfRooms > roomNumber) {
        this.booking.noOfRooms = roomNumber;
        // this.noOfRooms.reset();
        this.noOfRooms.setValue(roomNumber);
      }
    }
  }

  onChangePerson($event, personNumber: number) {
    if (this.booking.noOfPersons != undefined) {
      if (this.booking.noOfPersons > personNumber) {
        this.booking.noOfPersons = personNumber;
        this.noOfPersons.setValue(personNumber);
      }
    }
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
    this.apiService
      .authorisationToken(this.message)
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
  onSubmit(orderForm) { }
  customerLookup() {
    if (this.verifyOption == "email") {
      this.apiService
        .getCustomerDetailsByEmail(this.booking.email)
        .subscribe(
          (data) => {
            this.customerDto = new Customer();
            this.customerDto = data.body;
            console.log('Get customer ' + JSON.stringify(data.body));
            this.booking.firstName = this.customerDto.firstName;
            this.booking.lastName = this.customerDto.lastName;
            this.booking.mobile = this.customerDto.mobile;
            this.booking.customerId = this.customerDto.id;
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
            this.customerDto = new Customer();
            this.customerDto = data.body;
            console.log('Get customer ' + JSON.stringify(data.body));
            this.booking.firstName = this.customerDto.firstName;
            this.booking.lastName = this.customerDto.lastName;
            this.booking.mobile = this.customerDto.mobile;
            this.booking.customerId = this.customerDto.id;
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

  onCheckOut() {
    // this.dateModel.booking = this.booking;

    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     dateob: JSON.stringify(this.dateModel),
    //   },
    // };
    this.token.saveBookingData(this.booking);
    this.router.navigate(['/booking/payment']);
  }

  getCheckInDateFormat(dateString: string) {
    let yearAndMonth = dateString.split('-', 3);
    this.daySelected = String(yearAndMonth[2].split(' ', 1));
    this.yearSelected = yearAndMonth[0];
    this.monthSelected = parseInt(yearAndMonth[1]) - 1;
  }

  getcheckOutDateFormat(dateString: string) {
    let yearAndMonth = dateString.split('-', 3);
    this.daySelected2 = String(yearAndMonth[2].split(' ', 1));
    this.yearSelected2 = yearAndMonth[0];
    this.monthSelected2 = parseInt(yearAndMonth[1]) - 1;
  }

}
