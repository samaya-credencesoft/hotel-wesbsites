import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Booking } from '../../booking/../../booking/booking';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../api.service';
import { Payment } from './../../../../app/payment/payment';


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  @Input() booking: Booking ;
  bookingEmail: string ;
  bookingReferenceNumber: string ;
  payments: Payment [] ;


    constructor(private activatedRoute: ActivatedRoute, private apiServices: ApiService) {
      this.activatedRoute.queryParams.subscribe(params => {
        if ( this.bookingEmail !== undefined && this.bookingReferenceNumber !== undefined) {
          this.booking = new Booking();
          this.booking.email = this.bookingEmail;
          this.booking.id = +this.bookingReferenceNumber ;
       }
    });
     }

    ngOnInit() {
      console.log(`Inside Booking Details Booking Email: ${this.booking.email} & Booking Reference Number : ${this.booking.id}`);
      this.apiServices.getBookingDetailsByIdAndEmail(this.booking).subscribe( response => {
       this.booking = response.body.bookingDetails ;
       this.payments = response.body.paymentDetails;
       console.log(this.booking);
       console.log(this.payments);
      });
    }

  }
