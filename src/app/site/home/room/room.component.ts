import { TokenStorage } from 'src/app/token.storage';
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
  dateModel: DateModel;
  slideConfig =
  {
     centerMode: true,
     centerPadding: '20%',
     slidesToShow: 2,
     autoplay: true,
     autoplaySpeed: 2000,
     arrows: true,
     responsive: [
        {
          breakpoint: 1367,
          settings: {
            centerPadding: '15%'
          }
        },
        {
          breakpoint: 1025,
          settings: {
            centerPadding: '0',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 767,
          settings: {
            centerPadding: '0',
            slidesToShow: 1
          }
        }
     ]
  };
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

      // console.log('response room ' + JSON.stringify(response.body));
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
