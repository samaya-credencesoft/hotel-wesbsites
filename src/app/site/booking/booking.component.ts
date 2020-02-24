import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/room/room';
import { PROPERTY_ID, ApiService } from 'src/app/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { DateModel } from './../home/model/dateModel';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  rooms: Room[];
  dateModel: DateModel;

  daySelected: string;
  yearSelected: string;
  monthSelected: number;


  currentDay: string;
  day: string;
  year: string;
  month: number;

  day2: string;
  year2: string;
  month2: number;

  monthArray =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  constructor(
    private apiService: ApiService,
    private acRoute: ActivatedRoute,
    private router: Router) {
    this.dateModel = new DateModel();
  }

 ngOnInit() {
    this.checkincheckoutDate();
    this.getRoom();

    this.acRoute.queryParams.subscribe(params => {

      if(params["dateob"] != undefined)
      {
          this.dateModel = JSON.parse(params["dateob"]);
          this.getRoomByDate( this.dateModel.checkedin  ,this.dateModel.checkout  );
          this.getCheckInDateFormat(this.dateModel.checkedin);

      }

    });

  }
  checkincheckoutDate()
  {
    let currentDate: Date = new Date();
    this.day = this.getDay(currentDate);
    this.year = String(currentDate.getFullYear());
    this.month = currentDate.getMonth();


    let afterDate: Date = new Date();
    afterDate.setDate(currentDate.getDate()+1);

    this.day2 = this.getDay(afterDate);
    this.year2 = String(afterDate.getFullYear());
    this.month2 = afterDate.getMonth();
  }


  getDay(date: Date)
  {
    if(date.getDate().toString().length==1)
    {
        this.currentDay = '0'+date.getDate();
    }
    else
    {
        this.currentDay = ''+date.getDate();
    }

    return this.currentDay;
  }




  getRoom()
  {
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

getRoomByDate( fromDate: string ,toDate: string ) {
  this.apiService.getRoomDetailsByPropertyIdAndDate(PROPERTY_ID, fromDate, toDate) .subscribe(response => {

   // console.log('getRoomByDate ' + JSON.stringify(response.body));
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

}
