import { Component, AfterViewChecked, OnInit, Inject, ViewChild, Input, } from '@angular/core';
import { ApiService, SMS_NUMBER } from '../api.service';
import { Booking } from './booking';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Message } from 'primeng/components/common/api';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { Observable, throwError } from 'rxjs';
import { Room } from './../room/room';
import { Property } from './../property/property';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Payment } from './../payment/payment';
import { DISABLED } from '@angular/forms/src/model';
import { Msg } from './msg';
declare let paypal: any;
export interface Year {
  value: string;
  viewValue: string;
}
export interface Currency {
  value: string;
  viewValue: string;
}
export interface Month {
  value: string;
  viewValue: string;
}
export interface PaymentMode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-NZ' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class BookingComponent implements OnInit {
  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  @Input() room: Room;
  @Input() property: Property;
  msgs: Message[] = [];
  title = 'app';
  booking: Booking;
  availabilityCheck = false;
  name: FormControl = new FormControl();
  currency: FormControl = new FormControl();
  amount: FormControl = new FormControl();
  firstName: FormControl = new FormControl();
  lastName: FormControl = new FormControl();
  bookingEmail: FormControl = new FormControl();
  bookingContact: FormControl = new FormControl();
  bookingFromDate: FormControl = new FormControl({ value: new Date(), disabled: this.availabilityCheck });
  // bookingFromDate: FormControl = new FormControl(new Date());
  bookingRoomPrice: FormControl = new FormControl();
  bookingToDate: FormControl = new FormControl({ disabled: this.availabilityCheck });
  //bookingToDate: FormControl = new FormControl();
  bookingAmount: FormControl = new FormControl();
  airportShuttle: FormControl = new FormControl();
  addScript = false;
  paypalLoad = true;
  isShuttleBooked = false;

  referenceNumber: FormControl = new FormControl();
  paymentMode: FormControl = new FormControl();
  expMonth: FormControl = new FormControl();
  expYear: FormControl = new FormControl();
  cvv: FormControl = new FormControl();
  cardHolderName: FormControl = new FormControl();
  cardNumber: FormControl = new FormControl();
  todayDate = new Date();
  fromDate: Date;
  minToDate: Date;
  maxToDate: Date;
  toDateMinMilliSeconds: number;
  toDateMaxMilliSeconds: number;
  form: NgForm;
  //Spinner Properties
  spinner = false;
  submitDisabled  = false;
  bookingButtonLabel: String = 'Check Availability';
  payment: Payment;
  managerContact: string;

  propertyEmail: string;
  paymentModes: PaymentMode[] = [
    { value: 'Card', viewValue: 'Card' },
    { value: 'Cash', viewValue: 'Cash' },
    { value: 'Bank Transfer', viewValue: 'Bank Transfer' },
    { value: 'Wallet', viewValue: 'Wallet' },
    { value: 'Cheque', viewValue: 'Cheque' },
    { value: 'DemandDraft', viewValue: 'DemandDraft' }
  ];
  years: Year[] = [
    { value: '2018', viewValue: '2018' },
    { value: '2019', viewValue: '2019' },
    { value: '2020', viewValue: '2020' },
    { value: '2021', viewValue: '2021' },
    { value: '2022', viewValue: '2022' },
    { value: '2023', viewValue: '2023' }
  ];
  currencies: Currency[] = [
    { value: 'NZD', viewValue: 'NZD' },
    { value: 'AUD', viewValue: 'AUD' },
    { value: 'GBP', viewValue: 'GBP' },
    { value: 'USD', viewValue: 'USD' },
    { value: 'EUR', viewValue: 'EUR' },
  ];
  months: Month[] = [
    { value: '01', viewValue: '01' },
    { value: '02', viewValue: '02' },
    { value: '03', viewValue: '03' },
    { value: '04', viewValue: '04' },
    { value: '05', viewValue: '05' },
    { value: '06', viewValue: '06' },
    { value: '07', viewValue: '07' },
    { value: '08', viewValue: '08' },
    { value: '09', viewValue: '09' },
    { value: '10', viewValue: '10' },
    { value: '11', viewValue: '11' },
    { value: '12', viewValue: '12' }
  ];
  constructor(private http: HttpClient,
              private apiServices: ApiService,
              private snackBar: MatSnackBar
  ) {
  }
  ngOnInit() {
    this.spinner = false;
    this.submitDisabled = false;
    this.availabilityCheck = false;
    this.bookingFromDate.enable();
    this.bookingToDate.enable();
    this.bookingFromDate = new FormControl(new Date());
    this.payment = new Payment();
    this.booking = new Booking();
    this.booking.businessEmail = this.property.email;
    this.booking.propertyId = this.property.id;
    this.booking.roomId = +this.room.id;
    this.booking.businessEmail = this.property.email;
    this.booking.businessName = this.property.name;
    this.managerContact = this.property.managerContactNo ;
  }
  onCloseBooking(): void {
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }

  checkAvailabilty() {
    this.submitDisabled = true;
    this.spinner = !this.spinner;
    this.msgs = [];

    this.booking.fromDate = this.convertDate(this.bookingFromDate.value);
    this.booking.toDate = this.convertDate(this.bookingToDate.value);

    const checkAvailabilityObsrv = this.apiServices.checkAvailability(this.booking).subscribe(response => {
      this.spinner = !this.spinner;
      this.availabilityCheck = !this.availabilityCheck;
      if (response.status === 200) {
        this.bookingFromDate.disable();
        this.bookingToDate.disable();
        this.submitDisabled = false;
        this.bookingAmount.disable();
        this.booking.available = response.body.available;

        this.booking.totalAmount = response.body.bookingAmount;
        this.booking.payableAmount = response.body.bookingAmount;
        if (this.booking.available === false) {
          this.msgs.push({
            severity: 'warn',
            summary:
              'Appologies ! Seems we are soldout for the selected dates,please leave your details we will getback with in 24 hours. '
          });
          this.bookingButtonLabel = 'Enquire';
        }
        else {
          this.bookingButtonLabel = 'Book';
        }
      }
      else {
        this.msgs.push({
          severity: 'error',
          summary: response.status + ':' + response.statusText
        });

      }
    },
      error => this.handleError(error)
    );
  }
  submit() {
    if (this.bookingButtonLabel === 'Check Availability') {
      this.checkAvailabilty();
    } else if (this.bookingButtonLabel === 'Book' && this.booking.modeOfPayment != null && this.booking.modeOfPayment === 'Card') {
      this.chargeCreditCard();
     // this.processPayment(this.payment);
    } else if (this.bookingButtonLabel === 'Book' && this.booking.modeOfPayment != null ) {
      this.payment.paymentMode = this.booking.modeOfPayment;
      this.payment.amount = this.booking.payableAmount;
      this.payment.currency = 'NZD';
      this.payment.email = this.booking.email;
      this.payment.businessEmail = this.booking.businessEmail;
      this.payment.description = `Accomodation for   ${this.booking.firstName}   at ${this.booking.businessName}`;
      this.createBooking(this.booking);
      //this.processPayment(this.payment);
    } else if (this.bookingButtonLabel === 'Enquire') {
      this.createBooking(this.booking);
    }
  }
  chargeCreditCard() {
    this.spinner = !this.spinner;
    (<any>window).Stripe.card.createToken({
      number: this.payment.cardNumber,
      exp_month: this.payment.expMonth,
      exp_year: this.payment.expYear,
      cvc: this.payment.cvv,

    }, (status: number, response: any) => {
      if (status === 200) {
        this.spinner = !this.spinner;
        const token = response.id;
        this.payment.token = token;
        this.payment.amount = this.booking.payableAmount;
        this.payment.currency = 'NZD';
        this.payment.email = this.booking.email;
        this.payment.businessEmail = this.booking.businessEmail;
        this.payment.paymentMode = this.booking.modeOfPayment;
        this.payment.description = `Accomodation for   ${this.booking.firstName} at ${this.booking.businessName}` ;
        this.processPayment(this.payment);
      } else {
        this.spinner = !this.spinner;
        const snackBarRef = this.snackBar.open('Error message :' + response.error.message);
        snackBarRef.dismiss();
      }
    });
  }
  processPayment(payment: Payment) {

    this.spinner = !this.spinner;
    this.apiServices.processPayment(payment)
      .subscribe(response => {
        this.spinner = !this.spinner;
        if (response.status === 200) {
          this.payment = response.body;
          if (this.payment.status === 'Paid') {
            const snackBarRef = this.snackBar.open('Payment processed successfully.Creating booking ...', 'close');
            snackBarRef._dismissAfter(5000);
            this.createBooking(this.booking);
          } else {
            this.snackBar.open('ErroCode:' + payment.failureCode + 'and Error message :' + payment.failureMessage, '', {
              duration: 5000,
            });
          }
        } else {
          this.spinner = !this.spinner;
          this.msgs.push({
            severity: 'error',
            summary: 'Seems there is a problem in processing the payment, we have received your booking and will get in touch . !'
          });
        }

      });

  }
  createBooking(booking: Booking) {

    this.msgs = [];
    this.spinner = !this.spinner;
    //this.spinner = !this.spinner;
    const createBookingObsr = this.apiServices.createBooking(booking).subscribe(response => {
      this.spinner = !this.spinner;
      if (response.status === 200) {
        this.spinner = !this.spinner;
        this.booking = response.body;
        if (this.booking.id != null) {
          this.msgs.push({
            severity: 'success',
            detail:
              `Thanks for the booking .Please not the Reservation No:  # ${this.booking.id} and an email is sent with the booking details.`
          });
          if ( this.booking.mobile !== null && this.booking.mobile !== undefined ) {
          this.sendConfirmationMessage();
        }
          this.payment.referenceNumber = this.booking.id.toString();
          this.payment.externalReference = this.booking.externalBookingID;
          this.apiServices.savePayment(this.payment).subscribe(res => {
            if (res.status === 200) {
              this.openSuccessSnackBar(`Payment Details Saved`);
            } else {
              this.openErrorSnackBar(`Error in updating payment details`);
            }
            this.submitDisabled = true;
          }
          );
          this.spinner = !this.spinner;
        } else {
          this.spinner = !this.spinner;
          this.msgs.push({
            severity: 'error',
            summary: 'Please check the booking details and try again !'
          });
        }
      } else {
        this.spinner = !this.spinner;
        this.msgs.push({
          severity: 'error',
          summary: response.statusText + ':' + response.statusText
        });
      }
    });
    /*setTimeout(() => {
      this.msgs = [];
      createBookingObsr.unsubscribe();
      this.spinner = false;
      this.msgs.push({
        severity: 'error',
        summary: 'The server is taking more than usual time,please try again after sometime.'
      });
    }, 25000); */
  }
  reset() {
    this.bookingFromDate.enable();
    this.bookingToDate.enable();
    this.booking = new Booking();
    this.bookingFromDate = new FormControl(new Date());
    this.bookingToDate = new FormControl(this.setCheckOutDateOnReset(this.bookingFromDate.value));
    this.booking.propertyId = this.property.id;
    this.booking.roomId = +this.room.id;
    this.booking.businessEmail = this.property.email;
    this.booking.businessName = this.property.name;
    this.availabilityCheck = false;
    this.spinner = false;
    this.msgs = [];
    this.bookingButtonLabel = 'Check Availability';
  }

  setCheckOutDate(type: string, event: MatDatepickerInputEvent<Date>) {
    const fromDateMilliSeconds = event.value.getTime();
    this.toDateMinMilliSeconds = fromDateMilliSeconds + 86400000;
    this.toDateMaxMilliSeconds = fromDateMilliSeconds + (86400000 * 30);
    this.minToDate = new Date(this.toDateMinMilliSeconds);
    this.maxToDate = new Date(this.toDateMaxMilliSeconds);
  }
  setCheckOutDateOnReset(date: Date) {
    const fromDateMilliSeconds = date.getTime();
    this.toDateMinMilliSeconds = fromDateMilliSeconds + 86400000;
    this.toDateMaxMilliSeconds = fromDateMilliSeconds + (86400000 * 30);
    this.minToDate = new Date(this.toDateMinMilliSeconds);
    this.maxToDate = new Date(this.toDateMaxMilliSeconds);

  }
  convertDate(date: Date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let month1;
    let day1;
    if (month < 10) {
      month1 = `0${month}`;
    }
    else {
      month1 = `${month}`;
    }
    if (day < 10) {
      day1 = `0${day}`;
    }
    else {
      day1 = `${day}`;
    }
    return `${date.getFullYear()}-${month1}-${day1}`;
  }
  private handleError(error: HttpErrorResponse) {
    this.msgs = [];
    this.spinner = !this.spinner;
    if (error.error instanceof ErrorEvent) {
      this.msgs.push({
        severity: 'error',
        summary: ` The server responded with  erorr code : ${error.status} ,
            please email   ${this.booking.businessEmail} to the proceed with the booking `

      });
    } else {
      this.msgs.push({
        severity: 'error',
        summary: ` The server responded with  erorr code : ${error.status} ,
            please  email   ${this.booking.businessEmail} to the proceed with the booking `
      });
    }
    // return an observable with a user-facing error message
    return throwError(
      ` The server responded with  erorr code : ${error.status} ,
            please  email   ${this.booking.businessEmail} to the proceed with the booking `
    );
  }
  sendConfirmationMessage() {
    let msg = new Msg();
    msg.fromNumber = SMS_NUMBER;
    msg.toNumber = this.booking.mobile ;
    msg.message = `Dear ${this.booking.firstName},Rsvn#:${this.booking.id},${this.booking.roomName},Chk-In:${this.booking.fromDate},Chk-Out:${this.booking.toDate},Amt:${this.booking.payableAmount}NZD.Thx.${this.booking.businessName},${this.managerContact}` ;

    this.apiServices.sendTextMessage(msg).subscribe(response1 => {
      msg = response1.body;
      if ( msg.sid !== undefined ||  msg.sid !== null ) {
        this.openSuccessSnackBar('Booking Confirmation Sent.');
      }
    },
    error => { if (error instanceof HttpErrorResponse) {
      this.openErrorSnackBar('Error in sending sms');
    }
  });
  }
  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Error!', {
      panelClass: ['mat--errors'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 4000
    });
  }
  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Success!', {
      panelClass: ['mat--success'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 4000
    });
  }
}

