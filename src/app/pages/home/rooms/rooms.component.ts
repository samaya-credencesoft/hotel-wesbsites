import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { DateModel } from 'src/app/shared/models/dateModel';
import { Room } from 'src/app/shared/models/room';
import { TokenStorage } from 'src/app/token.storage';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {


  rooms: Room[];
  dateModel: DateModel;

  constructor(public apiService: ApiService,
              public router: Router,
              public token: TokenStorage) {
      this.dateModel = new DateModel();
    }

  ngOnInit() {
    this.getRoom();
  }
  getRoom() {
    this.apiService.getRoomDetailsByPropertyId(PROPERTY_ID).subscribe(response => {
      this.rooms = response.body;
console.log("roomdata ",JSON.stringify(this.rooms));
    },
      error => {
        if (error instanceof HttpErrorResponse) {

        }
      }
  );
  }


}
