import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../payment/payment';
import { ApiService } from './../api.service';
import { Property } from './../property/property';
import { Room } from './../room/room';
import { Booking } from './../booking/booking';
const PROPERTY_ID = 1;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  payment: Payment;
  booking: Booking;
  property: Property;
  loadingError = false;
  rooms: Room[] = [];
  bookingEmail: string;
  bookingReferenceNumber: string;
  amount: string;
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params !== undefined) {
        this.amount = params['Amount'];
        if (this.amount !== undefined) {
          this.payment = new Payment();
          this.payment.referenceNumber = params['BookingReferenceNumber'];
          this.payment.firstName = params['FirstName'];
          this.payment.lastName = params['LastName'];
          this.payment.amount = params['Amount'];
          this.payment.currency = params['Currency'];
          this.payment.email = params['Email'];
          this.payment.businessName = params['BusinessName'];
          this.payment.id = params['PaymentReferenceNumber'];
          this.payment.description = `Accomodation for ${this.payment.firstName}   at ${this.payment.businessName}`;
          console.log(this.payment); // Print the parameter to the console. 
        }
      }
      if (params !== undefined) {
        this.bookingReferenceNumber = params['BookingReferenceNumber'];
        this.bookingEmail = params['BookingEmail'];
        if (this.bookingEmail !== undefined && this.bookingReferenceNumber !== undefined) {
          this.booking = new Booking();
          this.booking.email = this.bookingEmail;
          this.booking.id = +this.bookingReferenceNumber;
        }
        
        console.log(`Booking Email: ${this.bookingEmail} & Booking Reference Number : ${this.bookingReferenceNumber}`);
      }
    });
  }

  ngOnInit() {
    this.loadPropetyDetails();
  }
  loadPropetyDetails() {
    this.apiService.getPropertyDetailsByPropertyId(PROPERTY_ID).subscribe(response => {
      this.property = response.body;
      // console.log(response);
      if (response.status === 200) {
        // console.log(this.property);
        if (this.property === null || this.property === undefined || this.property.id == null ||
          this.property.id <= 0 || this.property.address === undefined) {
          this.loadingError = true;
        } else {
          this.apiService.getRoomDetailsByPropertyId(this.property.id).subscribe(res => {
            this.rooms = res.body;
            // console.log(this.rooms);
          });
        }
      } else {
        this.loadingError = true;
      }
    });

  }

}


