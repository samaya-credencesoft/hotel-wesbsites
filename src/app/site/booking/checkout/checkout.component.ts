import { TokenStorage } from "./../../../token.storage";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DateModel } from "./../../home/model/dateModel";
import { NavigationExtras } from "@angular/router";
import { Router } from "@angular/router";
import { Booking } from "../../home/model/booking";
import { Payment } from "../../home/model/payment";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Msg } from "../../home/model/msg";
import { BankAccount } from "../../home/model/BankAccount";
import { MobileWallet } from "../../home/model/mobileWallet";
import { MessageDto } from "../../home/model/MessageDto";
import { Property } from "../../home/model/property";
import { formatDate } from "@angular/common";
import { Message } from "../../home/model/message";
import { Room } from "../../../room/room";
import { ApiService, PROPERTY_ID, SMS_NUMBER } from "src/app/api.service";
import { HttpErrorResponse } from "@angular/common/http";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
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
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  paymentLoader: boolean = false;
  verified = false;
  msgs: Message[] = [];
  loader: boolean = false;
  propertyName: string;
  isAvailableChecked: boolean = true;
  cashPayment: boolean;
  property: Property;

  bankAccount: BankAccount;
  mobileWallet: MobileWallet;
  mobileHasError: boolean;
  years: Year[] = [
    { value: "2021", viewValue: "2021" },
    { value: "2022", viewValue: "2022" },
    { value: "2023", viewValue: "2023" },
    { value: "2024", viewValue: "2024" },
    { value: "2025", viewValue: "2025" },
    { value: "2026", viewValue: "2026" },
    { value: "2027", viewValue: "2027" },
    { value: "2028", viewValue: "2028" },
    { value: "2029", viewValue: "2029" },
    { value: "2030", viewValue: "2030" },
  ];
  paymentModes: PaymentMode[] = [
    { value: "Cash", viewValue: "Cash on arrival" },
    { value: "Card", viewValue: "Card" },
    { value: "BankTransfer", viewValue: "BankTransfer" },
    { value: "Wallet", viewValue: "Wallet" },
    { value: "Cheque", viewValue: "Cheque" },
    { value: "DemandDraft", viewValue: "DemandDraft" },
  ];
  currencies: Currency[] = [
    { value: "INR", viewValue: "INR" },
    { value: "AUD", viewValue: "AUD" },
    { value: "BDT", viewValue: "BDT" },
    { value: "EUR", viewValue: "EUR" },
    { value: "GBP", viewValue: "GBP" },
    { value: "USD", viewValue: "USD" },
  ];
  months: Month[] = [
    { value: "01", viewValue: "01" },
    { value: "02", viewValue: "02" },
    { value: "03", viewValue: "03" },
    { value: "04", viewValue: "04" },
    { value: "05", viewValue: "05" },
    { value: "06", viewValue: "06" },
    { value: "07", viewValue: "07" },
    { value: "08", viewValue: "08" },
    { value: "09", viewValue: "09" },
    { value: "10", viewValue: "10" },
    { value: "11", viewValue: "11" },
    { value: "12", viewValue: "12" },
  ];

  expMonth: FormControl = new FormControl("", Validators.required);
  expYear: FormControl = new FormControl("", Validators.required);
  cvv: FormControl = new FormControl("", Validators.required);
  cardHolderName: FormControl = new FormControl("", Validators.required);
  cardNumber: FormControl = new FormControl("", Validators.required);
  paymentMode: FormControl = new FormControl("", Validators.required);
  bookingAmount: FormControl = new FormControl("", Validators.required);

  checkIn: FormControl = new FormControl();
  checkOut: FormControl = new FormControl();

  onPaymentForm: FormGroup = new FormGroup({
    expMonth: this.expMonth,
    expYear: this.expYear,
    cvv: this.cvv,
    cardHolderName: this.cardHolderName,
    cardNumber: this.cardNumber,
    paymentMode: this.paymentMode,
    bookingAmount: this.bookingAmount,
  });

  rooms: Room[];
  room: Room;
  dateModel: DateModel;
  booking: Booking;
  payment: Payment;

  daySelected: string;
  yearSelected: string;
  monthSelected: number;

  daySelected2: string;
  yearSelected2: string;
  monthSelected2: number;
  currentDay: string;

  isSuccess: boolean;
  headerTitle: string;
  bodyMessage: string;

  message: MessageDto;

  showAlert: boolean = false;
  alertType: string;
  contentDialog: any;

  DiffDate;
  enddate;
  startDate;

  monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  private ewaySecureFieldCode: string;
  private ewayErrors: string = null;
  private ewayInitComplete: boolean = false;
  submitButtonDisabled : boolean = false;
  currency: string;
  constructor(
    private apiService: ApiService,
    public token: TokenStorage,
    private router: Router,
    private snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private acRoute: ActivatedRoute
  ) {
    this.dateModel = new DateModel();
    this.booking = new Booking();
    this.room = new Room();
    this.payment = new Payment();
    this.property = new Property();

    if (this.token.getProperty() != undefined && this.token.getProperty() != null) {
      this.property = this.token.getProperty();
      this.currency = this.property.localCurrency.toLocaleUpperCase();
    }

    if (this.token.getBookingData() != undefined && this.token.getBookingData() != null) {
      this.booking = this.token.getBookingData();

      console.log('this.booking : ', JSON.stringify(this.booking));

      if (
        this.booking.fromDate != undefined &&
        this.booking.toDate != undefined
      ) {

        this.isAvailableChecked = true;
        // this.getCheckInDateFormat(this.booking.fromDate);
        // this.getcheckOutDateFormat(this.booking.toDate);
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
        // this.adults = this.booking.noOfPersons;
        // this.children = this.booking.noOfChildren;
        // this.noOfrooms = this.booking.noOfRooms;
      } else {

        this.booking.fromDate = this.getDateFormatYearMonthDay(
          this.fromDate.day,
          this.fromDate.month,
          this.fromDate.year
        );
        this.booking.toDate = this.getDateFormatYearMonthDay(
          this.toDate.day,
          this.toDate.month,
          this.toDate.year
        );
        this.isAvailableChecked = false;
        this.checkincheckOutDate();
      }
      
      this.getDiffDate(this.toDate, this.fromDate);

      console.log("this.bookingData ", JSON.stringify(this.booking));
    this.booking.discountAmount = 0;
    this.booking.netAmount = (this.booking.roomPrice * this.booking.noOfRooms * this.DiffDate) + this.booking.extraPersonCharge + this.booking.extraChildCharge;
    this.booking.gstAmount = (this.booking.netAmount * this.booking.taxPercentage) / 100;
    this.booking.totalAmount = this.booking.netAmount + this.booking.gstAmount - this.booking.discountAmount;
    
    }
   
  }

  ngOnInit() {
    // this.acRoute.queryParams.subscribe((params) => {
    if (this.token.getBookingData() != undefined) {
      this.booking = this.token.getBookingData();

      // this.room = this.dateModel.room;
      // this.booking = this.dateModel.booking;

      this.getCheckInDateFormat(this.booking.fromDate);
      this.getCheckOutDateFormat(this.booking.toDate);

      // this.booking.businessEmail = this.booking.email;
      // this.booking.fromDate = this.dateModel.checkIn;
      // this.booking.toDate = this.dateModel.checkOut;
      // this.booking.roomId = this.room.id;
      this.booking.propertyId = PROPERTY_ID;
      // this.checkAvailabilty();
      // this.booking.discountPercentage = 0;
    }
    if (this.token.getProperty() != undefined) {
      this.property = this.token.getProperty();

      this.bankAccount = this.property.bankAccount;
      this.mobileWallet = this.property.mobileWallet;
    }
    // });
  }
  getAvailableRoom() {
    this.dateModel = new DateModel();

    this.dateModel.checkIn = this.getDateFormat(this.booking.fromDate);
    this.dateModel.checkOut = this.getDateFormat(this.booking.toDate);
    this.dateModel.guest = this.booking.noOfPersons;
    this.dateModel.noOfRooms = this.booking.noOfRooms;

    // console.log(' this.dateModel '+JSON.stringify( this.dateModel));

    const navigationExtras: NavigationExtras = {
      queryParams: {
        dateob: JSON.stringify(this.dateModel),
      },
    };

    this.router.navigate(["/booking/choose"], navigationExtras);
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
      this.currentDay = "0" + date.getDate();
    } else {
      this.currentDay = "" + date.getDate();
    }

    return this.currentDay;
  }
  getRoomByDate() {
    if (this.checkIn.value === null) {
      this.dateModel.checkIn =
        this.yearSelected +
        "-" +
        this.monthSelected +
        1 +
        "-" +
        this.daySelected;
    } else {
      this.dateModel.checkIn = this.getDateFormat(this.checkIn.value);
    }

    if (this.checkOut.value === null) {
      this.dateModel.checkOut =
        this.yearSelected2 +
        "-" +
        this.monthSelected2 +
        1 +
        "-" +
        this.daySelected2;
    } else {
      this.dateModel.checkOut = this.getDateFormat(this.checkOut.value);
    }

    if (
      this.dateModel.checkOut != undefined &&
      this.dateModel.checkIn != undefined
    ) {
      this.isAvailableChecked = true;

      this.booking.businessEmail = this.booking.email;
      this.booking.fromDate = this.dateModel.checkIn;
      this.booking.toDate = this.dateModel.checkOut;
      this.booking.roomId = this.room.id;
      this.booking.propertyId = PROPERTY_ID;
      this.checkAvailabilty();
    }
  }

  getDateFormat(dateString: string) {
    var yearAndMonth = dateString.split("-", 3);
    return (
      yearAndMonth[0] +
      "-" +
      yearAndMonth[1] +
      "-" +
      yearAndMonth[2].split(" ", 1)
    );
  }

  checkAvailabilty() {
    this.loader = true;
    this.msgs = [];

    this.apiService
      .checkAvailability(this.booking)
      .subscribe(
        (response) => {
          this.loader = false;
          if (response.status === 200) {
            this.booking.available = response.body.available;
            this.booking.totalAmount = response.body.bookingAmount;
            this.booking.payableAmount = response.body.bookingAmount;
            this.booking.noOfExtraPerson = response.body.noOfExtraPerson;
            this.booking.extraPersonCharge = response.body.extraPersonCharge;

            console.log("avaiability" + JSON.stringify(response.body));

            if (this.booking.available === false) {
              this.msgs.push({
                severity: "warn",
                summary:
                  "Appologies ! Seems we are soldout for the selected dates,please leave your details we will getback with in 24 hours. ",
              });
              //this.bookingButtonLabel = 'Enquire';
            } else {
              //this.bookingButtonLabel = 'Book';
            }
          } else {
            this.msgs.push({
              severity: "error",
              summary: response.status + ":" + response.statusText,
            });
          }
        },
        (error) => this.handleError(error)
      );
  }

  private handleError(error: HttpErrorResponse) {
    this.msgs = [];
    this.loader = false;
    if (error.error instanceof ErrorEvent) {
      this.msgs.push({
        severity: "error",
        summary: ` The server responded with  erorr code : ${error.status} ,
          please email   ${this.booking.businessEmail} to the proceed with the booking `,
      });
    } else {
      this.msgs.push({
        severity: "error",
        summary: ` Erorr code : ${error.status} ,
          please  email   ${this.booking.businessEmail} to the proceed with the booking `,
      });
    }
    // return an observable with a user-facing error message
    /*return throwError(
    ` The server responded with  erorr code : ${error.status} ,
          please  email   ${this.booking.businessEmail} to the proceed with the booking `
  );*/
  }

  onCardPaymentSubmit() {
    this.payment.paymentMode = "Card";
    this.payment.status = "Paid";
    this.payment.firstName = this.booking.firstName;
    this.payment.lastName = this.booking.lastName;
    this.payment.netReceivableAmount = this.booking.netAmount;
    this.payment.transactionAmount = this.booking.totalAmount;
    this.payment.amount = this.booking.totalAmount;
    this.payment.propertyId = this.booking.propertyId;
    this.payment.transactionChargeAmount = this.booking.totalAmount;
    this.payment.email = this.booking.email;
    this.payment.businessEmail = this.property.email;
    this.payment.currency = this.property.localCurrency;
    this.payment.deliveryChargeAmount = 0;
    this.payment.date = formatDate(new Date(), "yyyy-MM-dd", "en");
    this.payment.taxAmount = this.booking.gstAmount;
    this.booking.taxAmount = this.booking.gstAmount;
    this.chargeCreditCard(this.payment);
  }
  onWalletPaymentSubmit() {
    this.payment.paymentMode = "Wallet";
    this.payment.status = "Paid";
    this.payment.firstName = this.booking.firstName;
    this.payment.lastName = this.booking.lastName;
    this.payment.netReceivableAmount = this.booking.netAmount;
    this.payment.transactionAmount = this.booking.totalAmount;
    this.payment.amount = this.booking.totalAmount;
    this.payment.propertyId = this.booking.propertyId;
    this.payment.email = this.booking.email;
    this.payment.businessEmail = this.property.email;
    this.payment.transactionChargeAmount = this.booking.totalAmount;
    this.payment.currency = this.property.localCurrency;
    this.payment.deliveryChargeAmount = 0;
    this.payment.date = formatDate(new Date(), "yyyy-MM-dd", "en");
    this.payment.taxAmount = this.booking.gstAmount;
    // this.booking.taxAmount = this.booking.gstAmount;

    this.processPayment(this.payment);
  }
  onBankPaymentSubmit(content) {
    this.payment.paymentMode = "BankTransfer";
    this.payment.status = "Paid";
    this.payment.firstName = this.booking.firstName;
    this.payment.lastName = this.booking.lastName;
    this.payment.netReceivableAmount = this.booking.netAmount;
    this.payment.transactionAmount = this.booking.totalAmount;
    this.payment.amount = this.booking.totalAmount;
    this.payment.propertyId = this.booking.propertyId;
    this.payment.email = this.booking.email;
    this.payment.businessEmail = this.property.email;
    this.payment.transactionChargeAmount = this.booking.totalAmount;
    this.payment.currency = this.property.localCurrency;
    this.payment.deliveryChargeAmount = 0;
    this.payment.date = formatDate(new Date(), "yyyy-MM-dd", "en");
    this.payment.taxAmount = this.booking.gstAmount;
    // this.booking.taxAmount = this.booking.gstAmount;

    this.processPayment(this.payment);
  }

  onCashPaymentSubmit() {
    this.payment.paymentMode = "Cash";
    this.payment.status = "NotPaid";
    this.payment.firstName = this.booking.firstName;
    this.payment.lastName = this.booking.lastName;
    this.payment.netReceivableAmount = this.booking.netAmount;
    this.payment.transactionAmount = this.booking.totalAmount;
    this.payment.amount = this.booking.totalAmount;
    this.payment.propertyId = this.booking.propertyId;
    this.payment.email = this.booking.email;
    this.payment.businessEmail = this.property.email;
    this.payment.transactionChargeAmount = this.booking.totalAmount;
    this.payment.currency = this.property.localCurrency;
    this.payment.deliveryChargeAmount = 0;
    this.payment.date = formatDate(new Date(), "yyyy-MM-dd", "en");
    this.payment.taxAmount = this.booking.gstAmount;
    // this.booking.taxAmount = this.booking.gstAmount;

    this.processPayment(this.payment);
  }

  chargeCreditCard(payment: Payment) {
    this.paymentLoader = true;
    if (this.property.paymentGateway == "eway") {
      const eWAY = (window as any).eWAY;

      const comp = this;

      eWAY.saveAllFields(() => {
        comp.paymentLoader = false;

        if (
          comp.ewaySecureFieldCode == null ||
          comp.ewaySecureFieldCode == undefined ||
          comp.ewaySecureFieldCode.trim().length < 5
        ) {
          comp.paymentLoader = false;
          comp.isSuccess = false;
          comp.headerTitle = "Error!";
          comp.bodyMessage = "Missing card information!";
          comp.showDanger(comp.contentDialog);
          comp.changeDetectorRefs.detectChanges();
        } else if (comp.ewayErrors != null && comp.ewayErrors != undefined) {
          comp.paymentLoader = false;
          comp.isSuccess = false;
          comp.headerTitle = "Error!";
          comp.bodyMessage =
            "Wrong card information!" + " Codes: " + comp.ewayErrors;
          comp.showDanger(comp.contentDialog);
          comp.changeDetectorRefs.detectChanges();
        } else {
          payment.token = comp.ewaySecureFieldCode;
          comp.processPayment(payment);
        }
      }, 2000);
    } else {
      (window as any).Stripe.card.createToken(
        {
          number: payment.cardNumber,
          exp_month: payment.expMonth,
          exp_year: payment.expYear,
          cvc: payment.cvv,
        },
        (status: number, response: any) => {
          if (status === 200) {
            const token = response.id;
            payment.token = token;

            this.processPayment(payment);
            this.changeDetectorRefs.detectChanges();
          } else if (status === 402) {
            this.paymentLoader = false;
            this.isSuccess = false;
            this.headerTitle = "Error!";
            this.bodyMessage = "Wrong card information!" + " Code: " + status;
            this.showDanger(this.contentDialog);
            this.changeDetectorRefs.detectChanges();
          } else {
            this.paymentLoader = false;
            this.isSuccess = false;
            this.headerTitle = "Error!";
            this.bodyMessage = "Card Payment Faied!" + " Code: " + status;
            this.showDanger(this.contentDialog);
            this.changeDetectorRefs.detectChanges();
          }
        }
      ),
        (error) => {
          this.paymentLoader = false;
        };
    }

    // (window as any).Stripe.card.createToken(
    //   {
    //     number: payment.cardNumber,
    //     exp_month: payment.expMonth,
    //     exp_year: payment.expYear,
    //     cvc: payment.cvv,
    //   },
    //   (status: number, response: any) => {
    //     if (status === 200) {
    //       const token = response.id;
    //       payment.token = token;

    //       // Logger.log('credit card info done' + JSON.stringify(this.payment));
    //       this.createBooking(this.booking);
    //       this.changeDetectorRefs.detectChanges();
    //     } else if (status === 402) {
    //       this.paymentLoader = false;
    //       this.isSuccess = false;
    //       this.headerTitle = "Error!";
    //       this.bodyMessage = "Wrong card information!" + " Code: " + status;
    //       this.showDanger(this.contentDialog);
    //       this.changeDetectorRefs.detectChanges();
    //     } else {
    //       this.paymentLoader = false;
    //       this.isSuccess = false;
    //       this.headerTitle = "Error!";
    //       this.bodyMessage = "Card Payment Faied!" + " Code: " + status;
    //       this.showDanger(this.contentDialog);
    //       this.changeDetectorRefs.detectChanges();
    //     }
    //   }
    // ),
    //   (error) => {
    //     this.paymentLoader = false;
    //   };
  }
  savePaymentProcess() {
    this.apiService.savePayment(this.payment).subscribe((res1) => {
      if (res1.status === 200) {
        this.payment = res1.body;
        // Logger.log('res1 save payment : ' + JSON.stringify(res1.body));
        // Logger.log('s : ' + JSON.stringify(this.slotReservation));

        this.booking.paymentId = this.payment.id;
        this.booking.modeOfPayment = this.payment.paymentMode;
        this.createBooking();
      } else {
        this.paymentLoader = false;
      }
    });
  }
  showSuccess(content) {
    this.alertType = "success";
    this.showAlert = true;
  }
  showWarning(content) {
    this.alertType = "warning";
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.changeDetectorRefs.detectChanges();
    }, 3000);
  }
  showDanger(content) {
    this.alertType = "danger";
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.changeDetectorRefs.detectChanges();
    }, 3000);
  }
  cashOnDelivery() {
    this.cashPayment = true;
  }
  cardPayment() {
    this.cashPayment = false;
  }
  bankPayment() {
    this.cashPayment = false;
  }
  MobileWallet() {
    this.cashPayment = false;
  }
  submitPayment() {
    if (
      this.booking.modeOfPayment != null &&
      this.booking.modeOfPayment === "Card"
    ) {
      // this.chargeCreditCard();
      this.processPayment(this.payment);
    } else if (
      this.booking.modeOfPayment != null &&
      this.booking.modeOfPayment != "Card"
    ) {
      this.loader = true;
      this.payment.amount = this.booking.payableAmount;
      this.payment.paymentMode = this.booking.modeOfPayment;
      this.payment.currency = "INR";
      this.payment.email = this.booking.email;
      this.payment.businessEmail = this.booking.businessEmail;
      this.payment.description = `Accomodation for  ${this.booking.firstName}  at  ${this.propertyName}`;
      this.createBooking();
    }
  }

  processPayment(payment: Payment) {
    this.paymentLoader = true;
    this.apiService.processPayment(payment).subscribe((response) => {
      if (response.status === 200) {
        if (response.body.failureMessage != null) {
          this.paymentLoader = false;
          this.isSuccess = false;
          this.headerTitle = "Error!";
          this.bodyMessage =
            "Unable to process payment" +
            " Code: " +
            response.body.failureMessage;
          this.showDanger(this.contentDialog);

          this.changeDetectorRefs.detectChanges();
        } else {
          this.paymentLoader = false;
          this.payment = response.body;
          this.booking.paymentId = response.body.id;
          this.booking.modeOfPayment = this.payment.paymentMode;

          this.apiService.savePayment(this.payment).subscribe(
            (res1) => {
              if (res1.status === 200) {
                this.paymentLoader = false;
                this.changeDetectorRefs.detectChanges();

                this.createBooking();
              } else {
                this.paymentLoader = false;
                this.isSuccess = false;
                this.headerTitle = "Error!";
                this.bodyMessage =
                  "Unable to save payment" + " Code: " + status;
                this.showDanger(this.contentDialog);

                this.paymentLoader = false;
                this.changeDetectorRefs.detectChanges();
              }
            },
            (error) => {
              this.paymentLoader = false;
              this.isSuccess = false;
              this.headerTitle = "Error!";
              this.bodyMessage = "Saving Payment Failed! Code: " + error.status;
              this.showDanger(this.contentDialog);
              this.changeDetectorRefs.detectChanges();
            }
          );
        }
      } else {
        this.paymentLoader = false;
        this.isSuccess = false;
        this.headerTitle = "Error!";
        this.bodyMessage = "Payment Failed! Code: " + response.status;
        this.showDanger(this.contentDialog);
        this.changeDetectorRefs.detectChanges();
      }
    });
  }

  createBooking() {
    this.booking.modeOfPayment = this.payment.paymentMode;
    this.booking.externalSite = "Website";
    this.booking.businessName = this.property.name;
    this.booking.businessEmail = this.property.email;
    this.booking.roomBooking = true;
    this.booking.bookingAmount = this.booking.totalAmount;
    this.booking.groupBooking = false;
    this.booking.available = true;
    this.booking.payableAmount = this.booking.totalAmount;
    this.booking.currency = this.property.localCurrency;

    console.log("createBooking ", JSON.stringify(this.booking));

    this.paymentLoader = true;

    this.apiService.createBooking(this.booking).subscribe((response) => {
      if (response.status === 200) {
        this.booking = response.body;
        if (this.booking.id != null) {
          this.openSuccessSnackBar(
            `Thanks for the booking .Please not the Reservation No:  # ${this.booking.id} and an email is sent with the booking details.`
          );
          // this.msgs.push({
          //   severity: 'success',
          //   detail:
          //     `Thanks for the booking .Please not the Reservation No:  # ${this.booking.id} and an email is sent with the booking details.`
          // });
          if (
            this.booking.mobile !== null &&
            this.booking.mobile !== undefined
          ) {
            this.sendConfirmationMessage();
          }
          this.payment.referenceNumber = this.booking.id.toString();
          this.payment.externalReference = this.booking.externalBookingID;
          this.apiService.savePayment(this.payment).subscribe((res) => {
            if (res.status === 200) {
              this.openSuccessSnackBar(`Payment Details Saved`);
            } else {
              this.openErrorSnackBar(`Error in updating payment details`);
            }
          });
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
      this.loader = false;
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

  completedPage() {
    this.dateModel.payment = this.payment;

    let navigationExtras: NavigationExtras = {
      queryParams: {
        dateob: JSON.stringify(this.dateModel),
      },
    };
    this.router.navigate(["/booking/details/"+this.booking.id+"/"+this.booking.email+""] );
  }

  sendConfirmationMessage() {
    let msg = new Msg();
    msg.fromNumber = SMS_NUMBER;
    msg.toNumber = this.booking.mobile;
    msg.message = `Dear ${this.booking.firstName},Rsvn#:${this.booking.id},${this.booking.roomName},Chk-In:${this.booking.fromDate},Chk-Out:${this.booking.toDate},Amt:${this.booking.payableAmount}INR.Thx.${this.booking.businessName},${this.booking.mobile}`;

    this.apiService.sendTextMessage(msg).subscribe(
      (response1) => {
        msg = response1.body;
        if (msg.sid !== undefined || msg.sid !== null) {
          this.openSuccessSnackBar("Booking Confirmation Sent.");
        }
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.openErrorSnackBar("Error in sending sms");
        }
      }
    );
  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, "Error!", {
      panelClass: ["mat--errors"],
      verticalPosition: "top",
      horizontalPosition: "right",
      duration: 4000,
    });
  }
  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, "Success!", {
      panelClass: ["mat--success"],
      verticalPosition: "top",
      horizontalPosition: "right",
      duration: 4000,
    });
  }

  getCheckInDateFormat(dateString: string) {
    var yearAndMonth = dateString.split("-", 3);
    this.daySelected = String(yearAndMonth[2].split(" ", 1));
    this.yearSelected = yearAndMonth[0];
    this.monthSelected = parseInt(yearAndMonth[1]) - 1;
  }

  getCheckOutDateFormat(dateString: string) {
    var yearAndMonth = dateString.split("-", 3);
    this.daySelected2 = String(yearAndMonth[2].split(" ", 1));
    this.yearSelected2 = yearAndMonth[0];
    this.monthSelected2 = parseInt(yearAndMonth[1]) - 1;
  }
  getDateFormatYearMonthDay(
    day12: number,
    month12: number,
    year12: number
  ): string {
    const year = year12;
    const date = day12;

    const month = month12;

    let month1;
    let day1;
    if (Number(month) < 10) {
      month1 = `0${month}`;
    } else {
      month1 = `${month}`;
    }
    if (Number(date) < 10) {
      day1 = `0${date}`;
    } else {
      day1 = `${date}`;
    }

    return `${year}-${month1}-${day1}`;
  }
}
