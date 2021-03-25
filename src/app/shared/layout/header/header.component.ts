import { Component, OnInit } from "@angular/core";
import { Property } from "src/app/site/home/model/property";
import { ApiService, PROPERTY_ID } from "src/app/api.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Room } from "src/app/room/room";
import { TokenStorage } from "../../../token.storage";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  weatherData: any = "";
  property: Property;
  rooms: Room[];
  constructor(private apiService: ApiService, private token: TokenStorage) {
    token.signOut();
    if (this.token.getProperty() === null) {
      this.getProperty();
    } else {
      this.property = this.token.getProperty();
    }
    this.getRoom();
    this.getWeather();
  }

  ngOnInit() {}
  getWeather() {
    this.apiService.getWeather("1275817").subscribe((response) => {
      this.weatherData = response.body;
      console.log("weatherData " + JSON.stringify(response.body));
    });
  }
  getRoom() {
    this.apiService.getRoomDetailsByPropertyId(PROPERTY_ID).subscribe(
      (response) => {
        //  console.log('response room ' + JSON.stringify(response.body));
        this.rooms = response.body;
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
        }
      }
    );
  }
  getProperty() {
      this.apiService.getPropertyDetailsByPropertyId(PROPERTY_ID).subscribe(response => {

        this.property = response.body;
        console.log('property: ', JSON.stringify(this.property) );
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
