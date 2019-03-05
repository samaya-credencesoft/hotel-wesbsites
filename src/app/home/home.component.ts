import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../payment/payment';
import { ApiService } from './../api.service';
import { Property } from './../property/property';
import { Room } from './../room/room';
const PROPERTY_ID = 1;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  payment: Payment;
  property: Property;
  loadingError = false;
  rooms: Room[] = [];


  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
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


