import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { Property } from 'src/app/property/property';
import { TokenStorage } from 'src/app/token.storage';

@Component({
  selector: 'app-getintouch',
  templateUrl: './getintouch.component.html',
  styleUrls: ['./getintouch.component.css']
})
export class GetintouchComponent implements OnInit {
  property: Property;

  lat : any = 40.80;
   lng : any = -73.70;

   mapScrollWheel : boolean = false;

  constructor(
    private apiService: ApiService,
    private token :TokenStorage

  ) {
    if(this.token.getProperty() === null ){

      this.getProperty();

        } else {
          this.property = this.token.getProperty();
        }

   }

  ngOnInit() {
  }
  getProperty() {
    this.apiService.getPropertyDetailsByPropertyId(PROPERTY_ID).subscribe(response => {

      this.property = response.body;
    },
      error => {
        if (error instanceof HttpErrorResponse) {

        }
      }
  );
  }
}
