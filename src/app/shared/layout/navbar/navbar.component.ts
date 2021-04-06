import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { Property } from 'src/app/model/property';
import { TokenStorage } from 'src/app/token.storage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  property: Property;
  mobileActive: boolean = false;
  sticky:boolean = false;

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
  onElementScroll(){
    if(this.sticky === true){
      this.sticky = false;

    } else{
      this.sticky = true;
    }
  }
  menuToggle(){
    if(this.mobileActive  === false){
      this.mobileActive  = true;
    }else{
      this.mobileActive  = false;
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
