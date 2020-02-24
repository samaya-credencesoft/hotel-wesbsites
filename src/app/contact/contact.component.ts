import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../property/property';
import { ApiService, PROPERTY_ID } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() property: Property;
  loadingError = false;

  lat = -36.79648;
  lng = 174.646926;
  constructor(private apiService: ApiService) {
    }
  ngOnInit() {

    this.getProperty();
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
