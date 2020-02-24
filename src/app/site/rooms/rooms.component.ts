import { Component, OnInit } from '@angular/core';
import {  ApiService  } from '../../api.service';
import {  PROPERTY_ID } from '../../api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Room } from './../../room/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Room[];

  constructor(private apiService: ApiService) { }

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

  onRoomBook()
  {

  }

}
