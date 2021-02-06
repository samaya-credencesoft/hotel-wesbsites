import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService, PROPERTY_ID } from '../api.service';
import { Property } from '../property/property';
import { TokenStorage } from '../token.storage';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  property: Property;
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
      this.token.saveProperty(this.property);
      this.token.savePropertyName(this.property.name);

    },
      error => {
        if (error instanceof HttpErrorResponse) {

        }
      }
  );
  }
}
