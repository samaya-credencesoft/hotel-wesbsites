import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { DateModel } from 'src/app/model/dateModel';
import { Room } from 'src/app/shared/models/room';
import { TokenStorage } from 'src/app/token.storage';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css']
})
export class AllRoomsComponent implements OnInit {

  rooms: Room[];
  dateModel: DateModel;

  constructor(private apiService: ApiService,
              private router: Router,
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
