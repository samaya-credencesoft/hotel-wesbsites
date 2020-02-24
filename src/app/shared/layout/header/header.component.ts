import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/property/property';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Room } from 'src/app/room/room';
import { TokenStorage } from '../../../token.storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  property: Property;
  rooms: Room[];
  constructor(private apiService: ApiService,
    private token :TokenStorage) { }

  ngOnInit() {
    this.getProperty();
    this.getRoom();
  }

  getRoom()
  {
    this.apiService.getRoomDetailsByPropertyId(PROPERTY_ID).subscribe(response => {

    //  console.log('response room ' + JSON.stringify(response.body));
      this.rooms = response.body;
    },
      error => {
        if (error instanceof HttpErrorResponse) {

        }
      }
  );
  }
  getProperty() {
    this.apiService.getPropertyDetailsByPropertyId(PROPERTY_ID).subscribe(response => {

      this.property = response.body;
      this.token.savePropertyName(this.property.name);
    },
      error => {
        if (error instanceof HttpErrorResponse) {

        }
      }
  );
  }
}
