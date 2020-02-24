import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/room/room';
import { PROPERTY_ID, ApiService ,SMS_NUMBER} from 'src/app/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { DateModel } from './../../home/model/dateModel';
import { NavigationExtras } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Booking } from '../../../booking/booking';
import { Payment } from './../../../payment/payment';
import { FormControl, FormGroup, NgForm, FormGroupDirective, Validators,FormBuilder } from '@angular/forms';
import { Msg } from './../../../booking/msg';

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
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  msgs: Message[] = [];
  loader: boolean = false;
  propertyName : string;
  isAvailableChecked : boolean = true;

  years: Year[] = [
    { value: '2018', viewValue: '2018' },
    { value: '2019', viewValue: '2019' },
    { value: '2020', viewValue: '2020' },
    { value: '2021', viewValue: '2021' },
    { value: '2022', viewValue: '2022' },
    { value: '2023', viewValue: '2023' }
  ];
  paymentModes: PaymentMode[] = [
    { value: 'Card', viewValue: 'Card' },
    { value: 'Cash', viewValue: 'Cash' },
    { value: 'BankTransfer', viewValue: 'BankTransfer' },
    { value: 'Wallet', viewValue: 'Wallet' },
    { value: 'Cheque', viewValue: 'Cheque' },
    { value: 'DemandDraft', viewValue: 'DemandDraft' }
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

  expMonth: FormControl = new FormControl("" ,Validators.required);
  expYear: FormControl = new FormControl("" ,Validators.required);
  cvv: FormControl = new FormControl("" ,Validators.required);
  cardHolderName: FormControl = new FormControl("" ,Validators.required);
  cardNumber: FormControl = new FormControl("" ,Validators.required);
  paymentMode: FormControl = new FormControl("" ,Validators.required);
  bookingAmount: FormControl = new FormControl("" ,Validators.required);

  checkedin: FormControl = new FormControl();
  checkedout: FormControl = new FormControl();

  onPaymentForm: FormGroup = new FormGroup({
    expMonth: this.expMonth,
    expYear: this.expYear,
    cvv: this.cvv,
    cardHolderName : this.cardHolderName,
    cardNumber: this.cardNumber,
    paymentMode : this.paymentMode,
    bookingAmount : this.bookingAmount,
  });



  rooms: Room[];
  room: Room;
  dateModel : DateModel;
  booking : Booking;
  payment : Payment;

  daySelected : string;
  yearSelected : string;
  monthSelected : number;

  daySelected2 : string;
  yearSelected2 : string;
  monthSelected2 : number;
  currentDay : string;

  monthArray =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];



  constructor(private apiService: ApiService,
    private router : Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private acRoute : ActivatedRoute,)
  {
    this.dateModel = new DateModel();
    this.booking = new Booking();
    this.room = new Room();
    this.payment = new Payment();
  }

 ngOnInit()
 {
  this.acRoute.queryParams.subscribe(params => {

    if(params["dateob"] != undefined)
    {
        this.dateModel = JSON.parse(params["dateob"]);

        this.room = this.dateModel.room;
        this.booking = this.dateModel.booking;

        this.getCheckInDateFormat(this.dateModel.checkedin);
        this.getCheckOutDateFormat(this.dateModel.checkout);

        this.booking.businessEmail = this.booking.email;
        this.booking.fromDate = this.dateModel.checkedin;
        this.booking.toDate = this.dateModel.checkout;
        this.booking.roomId = parseInt(this.room.id);
        this.booking.propertyId = PROPERTY_ID;
        this.checkAvailabilty();
    }

  });
 }

 checkedOutEvent()
 {
  this.isAvailableChecked = false;
 }

 checkedInEvent()
 {
  this.isAvailableChecked = false;
   let currentDate: Date = new Date(this.checkedin.value);

   let afterDate: Date = new Date();
   afterDate.setDate(currentDate.getDate()+1);
   afterDate.setFullYear(currentDate.getFullYear());
   afterDate.setMonth(currentDate.getMonth());

   this.daySelected2 = this.getDay(afterDate);
   this.yearSelected2 = String(afterDate.getFullYear());
   this.monthSelected2 = afterDate.getMonth();
 }
 getDay(date:Date)
 {
   if(date.getDate().toString().length==1)
   {
       this.currentDay = '0'+date.getDate();
   }
   else
   {
       this.currentDay = ''+date.getDate();
   }

   return this.currentDay;
 }
 getRoomByDate()
 {

  if(this.checkedin.value === null)
  {
    this.dateModel.checkedin = this.yearSelected+'-'+this.monthSelected+1+'-'+this.daySelected;
  }
  else
  {
    this.dateModel.checkedin = this.getDateFormat(this.checkedin.value);
  }

  if(this.checkedout.value === null)
  {
    this.dateModel.checkout =  this.yearSelected2+'-'+this.monthSelected2+1+'-'+this.daySelected2;
  }
  else
  {
    this.dateModel.checkout = this.getDateFormat(this.checkedout.value);
  }

  if(this.dateModel.checkout !=undefined && this.dateModel.checkedin !=undefined)
  {
     this.isAvailableChecked = true;

     this.booking.businessEmail = this.booking.email;
     this.booking.fromDate = this.dateModel.checkedin;
     this.booking.toDate = this.dateModel.checkout;
     this.booking.roomId = parseInt(this.room.id);
     this.booking.propertyId = PROPERTY_ID;
     this.checkAvailabilty();

  }

 }

 getDateFormat(dateString:string)
 {
   var yearAndMonth = dateString.split("-", 3);
   return yearAndMonth[0]+'-'+yearAndMonth[1]+'-'+ yearAndMonth[2].split(" ", 1);
 }

 checkAvailabilty() {

  this.loader = true;
  this.msgs = [];

  const checkAvailabilityObsrv = this.apiService.checkAvailability(this.booking).subscribe(response => {
    this.loader = false;
    if (response.status === 200) {

      this.booking.available = response.body.available;
      this.booking.totalAmount = response.body.bookingAmount ;
      this.booking.payableAmount = response.body.bookingAmount;
      this.booking.noOfExtraPerson = response.body.noOfExtraPerson;
      this.booking.extraPersonCharge = response.body.extraPersonCharge;

      console.log('avaiability'+JSON.stringify(response.body))

      if (this.booking.available === false) {
        this.msgs.push({
          severity: 'warn',
          summary:
            'Appologies ! Seems we are soldout for the selected dates,please leave your details we will getback with in 24 hours. '
        });
        //this.bookingButtonLabel = 'Enquire';
      } else {
        //this.bookingButtonLabel = 'Book';
      }
    } else {
      this.msgs.push({
        severity: 'error',
        summary: response.status + ':' + response.statusText
      });

    }
  },
    error => this.handleError(error)
  );
}

private handleError(error: HttpErrorResponse) {
  this.msgs = [];
  this.loader = false;
  if (error.error instanceof ErrorEvent) {
    this.msgs.push({
      severity: 'error',
      summary: ` The server responded with  erorr code : ${error.status} ,
          please email   ${this.booking.businessEmail} to the proceed with the booking `

    });
  } else {
    this.msgs.push({
      severity: 'error',
      summary: ` Erorr code : ${error.status} ,
          please  email   ${this.booking.businessEmail} to the proceed with the booking `
    });
  }
  // return an observable with a user-facing error message
  /*return throwError(
    ` The server responded with  erorr code : ${error.status} ,
          please  email   ${this.booking.businessEmail} to the proceed with the booking `
  );*/
}

 submitPayment()
 {
  if (this.booking.modeOfPayment != null && this.booking.modeOfPayment === 'Card') {
    this.chargeCreditCard();
    // this.processPayment(this.payment);
  } else if (this.booking.modeOfPayment != null && this.booking.modeOfPayment != 'Card') {
    this.loader = true;
    this.payment.amount = this.booking.payableAmount;
    this.payment.paymentMode = this.booking.modeOfPayment;
    this.payment.currency = 'NZD';
    this.payment.email = this.booking.email;
    this.payment.businessEmail = this.booking.businessEmail;
    this.payment.description = `Accomodation for  ${this.booking.firstName}  at  ${this.propertyName}`;
    this.createBooking(this.booking);
  }
 }

 chargeCreditCard() {
  this.loader = true;
  (<any>window).Stripe.card.createToken({
    number: this.payment.cardNumber,
    exp_month: this.payment.expMonth,
    exp_year: this.payment.expYear,
    cvc: this.payment.cvv,

  }, (status: number, response: any) => {

    if (status === 200) {

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
      this.loader = false;
      const snackBarRef = this.snackBar.open('Error message :' + response.error.message);
      snackBarRef.dismiss();
    }
  });
}

processPayment(payment: Payment) {

  this.apiService.processPayment(payment)
    .subscribe(response => {

      if (response.status === 200) {
        this.payment = response.body;
        if (this.payment.status === 'Paid') {
          const snackBarRef = this.snackBar.open('Payment processed successfully.Creating booking ...', 'close');
          snackBarRef._dismissAfter(5000);
          this.createBooking(this.booking);
        } else {
          this.loader = false;
          this.snackBar.open('ErroCode:' + payment.failureCode + 'and Error message :' + payment.failureMessage, '', {
            duration: 5000,
          });
        }
      } else {
        this.loader = false;
      }

    });

}

createBooking(booking: Booking) {

  const createBookingObsr = this.apiService.createBooking(booking).subscribe(response => {
    if (response.status === 200) {
      this.booking = response.body;
      if (this.booking.id != null) {

        this.openSuccessSnackBar(`Thanks for the booking .Please not the Reservation No:  # ${this.booking.id} and an email is sent with the booking details.`);
        // this.msgs.push({
        //   severity: 'success',
        //   detail:
        //     `Thanks for the booking .Please not the Reservation No:  # ${this.booking.id} and an email is sent with the booking details.`
        // });
        if ( this.booking.mobile !== null && this.booking.mobile !== undefined ) {
        this.sendConfirmationMessage();
      }
        this.payment.referenceNumber = this.booking.id.toString();
        this.payment.externalReference = this.booking.externalBookingID;
        this.apiService.savePayment(this.payment).subscribe(res => {
          if (res.status === 200) {
            this.openSuccessSnackBar(`Payment Details Saved`);
          } else {
            this.openErrorSnackBar(`Error in updating payment details`);
          }
        }
        );
         this.completedPage();
        this.loader = false;
      } else {
        this.loader = false;
        // this.msgs.push({
        //   severity: 'error',
        //   summary: 'Please check the booking details and try again !'
        // });
      }
    } else {
      this.loader = false;
      // this.msgs.push({
      //   severity: 'error',
      //   summary: response.statusText + ':' + response.statusText
      // });
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

completedPage()
{
  this.dateModel.payment = this.payment;

  let navigationExtras: NavigationExtras = {
    queryParams: {
        dateob: JSON.stringify(this.dateModel),
    }
  };
  this.router.navigate(['/booking/complete'],navigationExtras );
}

sendConfirmationMessage() {
  let msg = new Msg();
  msg.fromNumber = SMS_NUMBER;
  msg.toNumber = this.booking.mobile ;
  msg.message = `Dear ${this.booking.firstName},Rsvn#:${this.booking.id},${this.booking.roomName},Chk-In:${this.booking.fromDate},Chk-Out:${this.booking.toDate},Amt:${this.booking.payableAmount}NZD.Thx.${this.booking.businessName},${this.booking.mobile}` ;

  this.apiService.sendTextMessage(msg).subscribe(response1 => {
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

 getCheckInDateFormat(dateString:string)
 {
   var yearAndMonth = dateString.split("-", 3);
   this.daySelected = String(yearAndMonth[2].split(" ", 1));
   this.yearSelected = yearAndMonth[0];
   this.monthSelected = parseInt(yearAndMonth[1])-1;
 }

 getCheckOutDateFormat(dateString:string)
 {
   var yearAndMonth = dateString.split("-", 3);
   this.daySelected2 = String(yearAndMonth[2].split(" ", 1));
   this.yearSelected2 = yearAndMonth[0];
   this.monthSelected2 = parseInt(yearAndMonth[1])-1;
 }



}
