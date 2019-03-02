import { Component, OnInit } from "@angular/core";
import { Property } from "../property/property";
import { Room } from "../room/room";
import { ApiService } from "../api.service";

const PROPERTY_ID = 1;

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
  rooms: Room[] = [];
  property: Property;
  loadingError = false;

  ngOnInit() {}

  constructor(private apiService: ApiService) {
    this.loadPropetyDetails();
  }
  loadPropetyDetails() {
    this.apiService
      .getPropertyDetailsByPropertyId(PROPERTY_ID)
      .subscribe(response => {
        this.property = response.body;
        // console.log(response);
        if (response.status === 200) {
          // console.log(this.property);
          if (
            this.property === null ||
            this.property === undefined ||
            this.property.id == null ||
            this.property.id <= 0 ||
            this.property.address === undefined
          ) {
            this.loadingError = true;
          } else {
            this.apiService
              .getRoomDetailsByPropertyId(this.property.id)
              .subscribe(res => {
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
