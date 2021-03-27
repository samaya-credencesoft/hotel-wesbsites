import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { Property } from 'src/app/model/property';
import { TokenStorage } from 'src/app/token.storage';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  property: Property;
  constructor(
    public router: Router,
   public token: TokenStorage,
   public apiService: ApiService
  ) {
    this.property = new Property();
    if (this.token.getProperty() !== null) {
      this.property = this.token.getProperty();
    } else {
      this.getProperty();
    }

  }

  ngOnInit(): void {
    if (this.token.getProperty() !== null) {
      this.property = this.token.getProperty();
    } else {
      this.getProperty();
    }
  }
  getProperty() {
    this.apiService.getPropertyDetailsByPropertyId(PROPERTY_ID).subscribe(response => {

      this.property = response.body;
      this.token.saveProperty(this.property);
    },
      error => {
        if (error instanceof HttpErrorResponse) {

        }
      }
    );
  }

}
