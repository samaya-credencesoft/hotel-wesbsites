import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/room/room';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DateModel } from './../../home/model/dateModel';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  rooms: Room[];
  dateModel : DateModel;

  constructor(private apiService: ApiService,
    private router: Router)
    {
      this.dateModel = new DateModel();
    }
  ngOnInit() {
    this.getRoom();
  }

  getRoom()
  {
    this.apiService.getRoomDetailsByPropertyId(PROPERTY_ID).subscribe(response => {

      //console.log('response room ' + JSON.stringify(response.body));
      this.rooms = response.body;
    },
      error => {
        if (error instanceof HttpErrorResponse) {

        }
      }
  );
  }

  onRoomBook(room)
  {
    this.dateModel.room = room;

    let navigationExtras: NavigationExtras = {
      queryParams: {
          dateob: JSON.stringify(this.dateModel),
      }
    };
    this.router.navigate(['/booking/booking'],navigationExtras );
  }


}
