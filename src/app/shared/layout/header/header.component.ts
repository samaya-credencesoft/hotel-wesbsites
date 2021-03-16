import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { TokenStorage } from 'src/app/token.storage';
import { Property } from '../../models/property';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  property: Property;
  constructor(
    private router: Router,
    private token: TokenStorage,
    private apiService: ApiService
  ) {
    this.property = new Property();
    if (this.token.getProperty() !== null) {
      this.property = this.token.getProperty();
    } else {
      this.getProperty();
    }
  }

  ngOnInit(): void {
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
