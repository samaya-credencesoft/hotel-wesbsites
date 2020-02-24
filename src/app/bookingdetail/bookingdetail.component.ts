import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Booking } from '../booking/booking';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../api.service';
import { Payment } from './../payment/payment';


@Component({
  selector: 'app-bookingdetail',
  templateUrl: './bookingdetail.component.html',
  styleUrls: ['./bookingdetail.component.css']
})
export class BookingdetailComponent implements OnInit {
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

    this.apiServices.getBookingDetailsByIdAndEmail(this.booking).subscribe( response => {
     this.booking = response.body.bookingDetails ;
     this.payments = response.body.paymentDetails;

    });
  }

}
