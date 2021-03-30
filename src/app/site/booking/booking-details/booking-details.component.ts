import { TokenStorage } from 'src/app/token.storage';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from './../../../api.service';
import { DateService } from '../../../date-service.service';
import { Booking } from 'src/app/model/booking';
import { Payment } from 'src/app/model/payment';
import { DateModel } from 'src/app/model/dateModel';


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  dateModel:DateModel;
  currency: string;
  booking: Booking ;
  bookingEmail: string ;
  bookingReferenceNumber: string ;
  payment: Payment;
  payments: Payment [] ;
  loader : boolean = false;
  taxPercentage: number;
  discountPercentage: boolean = false;
  showAlert: boolean = false;
    constructor(
      private router: Router,
      public token: TokenStorage,
      private activatedRoute: ActivatedRoute,
      public dateService : DateService,
      private changeDetectorRefs: ChangeDetectorRef,
      private apiServices: ApiService) {

        this.booking = new Booking();

        let id = this.activatedRoute.snapshot.params['id'];
        this.activatedRoute.params.subscribe(params => {
          id = +params['id'];
          this.booking.id = id;

          this.bookingReferenceNumber = id;
        });

        let email = this.activatedRoute.snapshot.paramMap.get('email');
        this.activatedRoute.queryParams.subscribe(params => {
          this.booking.email = email;

          this.bookingEmail = email;
        });

        console.log('booking detail ob: ' + JSON.stringify( this.booking));
     }

    ngOnInit() {
      console.log(`Inside Booking Details Booking Email: ${this.booking.email} & Booking Reference Number : ${this.booking.id}`);

      this.loader = true;
      this.apiServices.getBookingDetailsByIdAndEmail(this.booking).subscribe( response => {
       this.booking = response.body.bookingDetails ;
       this.payments = response.body.paymentDetails;
       this.payment = this.payments[0];
       this.loader = false;

       this.currency = this.booking.currency;

       this.changeDetectorRefs.detectChanges();
       console.log(this.booking);
       console.log(this.payment);
      },error=>{ this.loader = false;});
    }
    onGoHome() {
      this.router.navigate(["/"]);
      // this.locationBack.back();
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

  }
