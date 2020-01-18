import { Component, OnInit, Input } from '@angular/core';
import { Payment } from './payment';
import { ApiService } from './../api.service';
import { Message } from 'primeng/components/common/api';
import { HTTPStatus } from './../app.interceptor';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  msgs: Message[] = [];

  nameFormControl = new FormControl();
  currencyFormControl = new FormControl('', [Validators.required]);
  amountFormControl = new FormControl('', [Validators.required]);
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  bookingEmailFormControl = new FormControl();
  bookingContactFormControl = new FormControl();
  referenceNumberFormControl = new FormControl('', [Validators.required]);
  paymentModeFormControl = new FormControl();
  expMonthFormControl = new FormControl('', [Validators.required]);
  expYearFormControl = new FormControl('', [Validators.required]);
  cvvFormControl = new FormControl('', [Validators.required]);
  cardHolderNameFormControl = new FormControl('', [Validators.required]);
  cardNumberFormControl = new FormControl('', [Validators.required]);
  currency: FormControl = new FormControl();

  paymentForm: FormGroup = new FormGroup({
    currency: this.currencyFormControl,
    amount: this.amountFormControl,
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    referenceNumber: this.referenceNumberFormControl,
    expMonth: this.expMonthFormControl,
    expYear: this.expYearFormControl,
    cvv: this.cvvFormControl,
    cardHolderName: this.cardHolderNameFormControl,
    cardNumber: this.cardNumberFormControl
  });
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
  currencies: Currency[] = [{ value: 'nzd', viewValue: 'NZD' }];
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
    this.currency.setValue(this.payment.currency);
  }
  submit() {
    console.log(this.payment.paymentMode);
    console.log(this.payment);
    this.payment.paymentMode = 'Card';
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
    this.msgs = [];
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
          this.msgs.push({
            severity: 'error',
            summary: 'Error message :' + response.error.message
          });
        }
      }
    );
  }
  processPayment(payment: Payment) {
    this.msgs = [];
    this.showLoader();
    this.apiService.processPayment(payment).subscribe(res => {
      this.payment = res.body;
      if (
        this.payment.paymentMode === 'Card' &&
        this.payment.status === 'Paid'
      ) {
        this.msgs.push({
          severity: 'success',
          detail: `Payment processed successfully.Saving Payment ...`
        });

        this.apiService.savePayment(this.payment).subscribe(res1 => {
          if (res1.status === 200) {
            this.msgs.push({
              severity: 'success',
              detail: `Payment Details Saved`
            });
          } else {
            this.msgs.push({
              severity: 'error',
              summary: 'Error in updating payment details'
            });
          }
        });
        //  this.reset();
      } else if (
        this.payment.paymentMode === 'Card' &&
        this.payment.status === 'NotPaid'
      ) {
        this.msgs.push({
          severity: 'error',
          summary:
            'ErroCode:' +
            res.body.failureCode +
            'and Error message :' +
            res.body.failureMessage
        });
      } else if (this.payment.paymentMode != null) {
        this.apiService.savePayment(this.payment).subscribe(res1 => {
          if (res1.status === 200) {
            this.msgs.push({
              severity: 'success',
              detail: `Payment Details Saved`
            });
          } else {
            this.msgs.push({
              severity: 'error',
              summary: 'Error in updating payment details'
            });
          }
        });
        //  this.reset();
      } else {
        this.msgs.push({
          severity: 'error',
          summary:
            'ErroCode:' +
            res.body.failureCode +
            'and Error message :' +
            res.body.failureMessage
        });

      }
    });
  }
  showLoader(): void {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.loader = status;
    });
  }
}
