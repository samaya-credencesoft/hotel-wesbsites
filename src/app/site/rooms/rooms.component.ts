import { Component, OnInit } from '@angular/core';
import {  ApiService  } from '../../api.service';
import {  PROPERTY_ID } from '../../api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Room } from './../../room/room';
import { DateModel } from '../home/model/dateModel';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Room[];
  dateModel: DateModel;

  constructor(private apiService: ApiService,
              private router: Router) {
      this.dateModel = new DateModel();
    }
  ngOnInit() {
    this.getRoom();
  }

  getRoom() {
    this.apiService.getRoomDetailsByPropertyId(PROPERTY_ID).subscribe(response => {
      this.rooms = response.body;
    },
      error => {
        if (error instanceof HttpErrorResponse) {

        }
      }
  );
  }
  onRoomBook(room) {
    this.dateModel.room = room;

    const navigationExtras: NavigationExtras = {
      queryParams: {
          dateob: JSON.stringify(this.dateModel),
      }
    };
    this.router.navigate(['/booking/booking'], navigationExtras );
  }


}
