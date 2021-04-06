import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { DateModel } from 'src/app/model/dateModel';
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

  slideConfig = {
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1367,
        settings: {
          centerPadding: '0',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          centerPadding: '0',
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          centerPadding: '0',
          slidesToShow: 1,
        },
      },
    ],
  };
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
