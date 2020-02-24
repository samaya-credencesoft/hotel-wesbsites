import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/room/room';
import { PROPERTY_ID, ApiService } from 'src/app/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DateModel } from './../../home/model/dateModel';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-room',
  templateUrl: './choose-room.component.html',
  styleUrls: ['./choose-room.component.css']
})
export class ChooseRoomComponent implements OnInit {


  rooms: Room[];
  dateModel: DateModel;

  daySelected: string;
  yearSelected: string;
  monthSelected: number;

  daySelected2: string;
  yearSelected2: string;
  monthSelected2: number;


  currentDay: string;

  monthArray =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private acRoute: ActivatedRoute,)
  {
    this.dateModel = new DateModel();
  }

 ngOnInit() {
    //this.checkincheckoutDate();
    this.getRoom();

    this.acRoute.queryParams.subscribe(params => {

      if(params["dateob"] != undefined)
      {
          this.dateModel = JSON.parse(params["dateob"]);

        //  this.getRoomByDate( this.dateModel.checkedin  ,this.dateModel.checkout  );

          this.getCheckInDateFormat(this.dateModel.checkedin);
          this.getCheckOutDateFormat(this.dateModel.checkout);
      }

    });

  }

  onRoomBooking(room)
  {

    this.dateModel.room = room;

    let navigationExtras: NavigationExtras = {
      queryParams: {
          dateob: JSON.stringify(this.dateModel),
      }
    };
    this.router.navigate(['/booking/booking'],navigationExtras );
  }


  getRoom()
  {
    this.apiService.getRoomDetailsByPropertyId(PROPERTY_ID).subscribe(response => {

      console.log('response room choose room ' + JSON.stringify(response.body));
      this.rooms = response.body;
    },
      error => {
        if (error instanceof HttpErrorResponse) {

        }
      }
  );
  }

  getRoomByDate( fromDate: string ,toDate: string ) {
    this.apiService.getRoomDetailsByPropertyIdAndDate(PROPERTY_ID, fromDate, toDate) .subscribe(response => {

      this.rooms = response.body;
    },
      error => {
        if (error instanceof HttpErrorResponse) {

        }
      }
  );
  }

  getCheckInDateFormat(dateString: string)
  {
    var yearAndMonth = dateString.split("-", 3);
    this.daySelected = String(yearAndMonth[2].split(" ", 1));
    this.yearSelected = yearAndMonth[0];
    this.monthSelected = parseInt(yearAndMonth[1])-1;
  }

  getCheckOutDateFormat(dateString: string)
  {
    var yearAndMonth = dateString.split("-", 3);
    this.daySelected2 = String(yearAndMonth[2].split(" ", 1));
    this.yearSelected2 = yearAndMonth[0];
    this.monthSelected2 = parseInt(yearAndMonth[1])-1;
  }

}
