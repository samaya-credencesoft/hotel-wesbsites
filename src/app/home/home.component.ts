import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../payment/payment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  payment: Payment;

  constructor(private activatedRoute: ActivatedRoute) {
    this.payment = new Payment();
    this.activatedRoute.queryParams.subscribe(params => {
      this.payment.referenceNumber = params['ReferenceNumber'];
      this.payment.firstName = params['FirstName'];
      this.payment.lastName = params['LastName'];
      this.payment.amount = params['Amount'];
      this.payment.currency = params['Currency'];
      this.payment.email = params['Email'];
      this.payment.businessName = params['BusinessName'];
      this.payment.description = `Accomodation for ${this.payment.firstName}   at ${this.payment.businessName}`;
      console.log(this.payment); // Print the parameter to the console. 
  });
   }

  ngOnInit() {
  }

}


