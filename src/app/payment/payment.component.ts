import { Component, OnInit, Input } from '@angular/core';
import { Payment } from './payment';
import { ApiService } from './../api.service';
import { HTTPStatus } from './../app.interceptor';
import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Property } from '../property/property';

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

export interface ModeOfPayment {
  value: string;
  viewValue: string;
}

export interface PaymentStatus {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  name: FormControl = new FormControl();
  currency: FormControl = new FormControl();
  amount: FormControl = new FormControl();
  firstName: FormControl = new FormControl();
  lastName: FormControl = new FormControl();
  bookingEmail: FormControl = new FormControl();
  bookingContact: FormControl = new FormControl();
  referenceNumber: FormControl = new FormControl();
  paymentMode: FormControl = new FormControl();
  expMonth: FormControl = new FormControl();
  expYear: FormControl = new FormControl();
  cvv: FormControl = new FormControl();
  cardHolderName: FormControl = new FormControl();
  cardNumber: FormControl = new FormControl();

  years: Year[] = [
    { value: '2018', viewValue: '2018' },
    { value: '2019', viewValue: '2019' },
    { value: '2020', viewValue: '2020' },
    { value: '2021', viewValue: '2021' },
    { value: '2022', viewValue: '2022' },
    { value: '2023', viewValue: '2023' },
    { value: '2024', viewValue: '2024' },
    { value: '2025', viewValue: '2025' },
    { value: '2026', viewValue: '2026' },
    { value: '2027', viewValue: '2027' },
    { value: '2028', viewValue: '2028' },
    { value: '2029', viewValue: '2029' },
    { value: '2030', viewValue: '2030' }
  ];
  currencies: Currency[] = [
    { value: 'nzd', viewValue: 'NZD' }
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
  modeofpayments: ModeOfPayment[] = [
    { value: 'Card', viewValue: 'Card' },
    { value: 'Cash', viewValue: 'Cash' },
    { value: 'Bank Transfer', viewValue: 'Bank Transfer' },
    { value: 'Wallet', viewValue: 'Wallet' },
    { value: 'Cheque', viewValue: 'Cheque' },
    { value: 'Demand Draft', viewValue: 'Demand Draft' }
  ];

  paymentstatuss: PaymentStatus[] = [
    { value: 'Paid', viewValue: 'Paid' },
    { value: 'Not Paid', viewValue: 'Not Paid' }
  ];
  @Input() payment: Payment;
  loader = false;
 
  constructor(
    private apiService: ApiService,
    private httpStatus: HTTPStatus,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.payment === undefined) {
      this.payment = new Payment();
    }
    console.log(this.payment);
    this.currency.setValue(this.payment.amount);
    this.payment.paymentMode = 'Card';
  }
  submit() {
    console.log(this.payment.paymentMode);
    if (
      this.payment.paymentMode != null &&
      this.payment.paymentMode === 'Card'
    ) {
      this.chargeCreditCard();
    } else {
      this.processPayment(this.payment);
    }
  }

  chargeCreditCard() {
    console.log(this.payment);
    (window as any).Stripe.card.createToken(
      {
        number: this.payment.cardNumber,
        exp_month: this.payment.expMonth,
        exp_year: this.payment.expYear,
        cvc: this.payment.cvv
      },
      (status: number, response: any) => {
        if (status === 200) {
          const token = response.id;
          this.payment.token = token;
          this.processPayment(this.payment);
        } else {
          const snackBarRef = this.snackBar.open(
            'Error message :' + response.error.message
          );
          snackBarRef.dismiss();
        }
      }
    );
  }
  processPayment(payment: Payment) {
    this.showLoader();
    this.apiService.processPayment(payment).subscribe(res => {
      this.payment = res.body;
      if (
        this.payment.paymentMode === 'Card' &&
        this.payment.status === 'Paid'
      ) {
        this.openSuccessSnackBar(
          'Payment processed successfully.Saving Payment ...'
        );
        this.apiService.savePayment(this.payment).subscribe(res1 => {
          if (res1.status === 200) {
            this.openSuccessSnackBar(`Payment Details Saved`);
          } else {
            this.openErrorSnackBar(`Error in updating payment details`);
          }
        });
        //  this.reset();
      } else if (this.payment.paymentMode === 'Card' &&
      this.payment.status === 'NotPaid') {
        this.snackBar.open(
          'ErroCode:' +
            res.body.failureCode +
            'and Error message :' +
            res.body.failureMessage,
          '',
          {
            duration: 10000
          }
        );

      }
      else if (this.payment.paymentMode != null) {
        this.apiService.savePayment(this.payment).subscribe(res1 => {
          if (res1.status === 200) {
            this.openSuccessSnackBar(`Payment Details Saved`);
          } else {
            this.openErrorSnackBar(`Error in updating payment details`);
          }
        });
        //  this.reset();
      } else {
        this.snackBar.open(
          'ErroCode:' +
            res.body.failureCode +
            'and Error message :' +
            res.body.failureMessage,
          '',
          {
            duration: 10000
          }
        );
      }
    });
  }
  showLoader(): void {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.loader = status;
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
  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Error!', {
      panelClass: ['mat--errors'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 4000
    });
  }
}
