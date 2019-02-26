import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Property } from './../property/property';
import { Room } from './../room/room';
import { ApiService } from './../api.service';



const PROPERTY_ID = 1;



@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {


  rooms: Room[] = [];
  property: Property;
  loadingError = false;

  loadPropetyDetails() {
    this.apiService.getPropertyDetailsByPropertyId(PROPERTY_ID).subscribe(response => {
      this.property = response.body;
      console.log(response);
      if (response.status === 200) {
        console.log(this.property);
        if (this.property === null || this.property === undefined || this.property.id == null || 
          this.property.id <= 0 || this.property.address === undefined) {
          console.log("Create a Modal to call the property directly");
          this.loadingError = true;
        } else {
          this.apiService.getRoomDetailsByPropertyId(this.property.id).subscribe(res => { 
            this.rooms = res.body;
            console.log(this.rooms);
          });
        }
      } else {
        this.loadingError = true;
      }
    });

  }

  ngOnInit() {
    this.loadPropetyDetails();
  }

  constructor(
    private apiService: ApiService
  ) {}

}
