import { TokenStorage } from 'src/app/token.storage';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Booking } from '../../home/model/booking';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../api.service';
import { DateService } from '../../../date-service.service'
import { Payment } from '../../home/model/payment';


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
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
       this.loader = false;

       this.currency = this.booking.currency;
      //  console.log(this.booking);
      //  console.log(this.payments);
      },error=>{ this.loader = false;});
    }
    onGoHome() {
      this.router.navigate(["/"]);
      // this.locationBack.back();
    }
  }
