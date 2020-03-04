import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Room } from 'src/app/room/room';
import { DateModel } from '../../home/model/dateModel';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: number;
  rooms: Room[];
  room: Room;
  currentDay: string;
  day: string;
  year: string;
  month: number;

  day2: string;
  year2: string;
  month2: number;

  fromDate: string;
  dateModel: DateModel;

  checkedin: FormControl = new FormControl();
  checkedout: FormControl = new FormControl();

  monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService) {


    this.room = new Room();

    this.id = this.route.snapshot.params.id;
    this.route.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number
      console.log('list detail page: ' + this.id);

      // console.log('list detail page: ' + JSON.stringify(this.room));
    });
  }

  ngOnInit() {
    this.getRoom();
    this.checkincheckoutDate();
  }

  getRoom() {
    this.apiService.getRoomDetailsByPropertyId(PROPERTY_ID).subscribe(response => {
      this.rooms = response.body;

      this.setRoom((this.id));
    },
      error => {
        if (error instanceof HttpErrorResponse) {

        }
      }
  );
  }

  setRoom(id: number) {
    this.room = this.rooms.find(room =>
      room.id === id
    );

    console.log('this.room : '+JSON.stringify(this.room));
  }


checkincheckoutDate() {
  const currentDate: Date = new Date();
  this.day = this.getDay(currentDate);
  this.year = String(currentDate.getFullYear());
  this.month = currentDate.getMonth();


  const afterDate: Date = new Date();
  afterDate.setDate(currentDate.getDate() + 1);

  this.day2 = this.getDay(afterDate);
  this.year2 = String(afterDate.getFullYear());
  this.month2 = afterDate.getMonth();
}


getDay(date: Date) {
  if (date.getDate().toString().length == 1) {
      this.currentDay = '0' + date.getDate();
  } else {
      this.currentDay = '' + date.getDate();
  }

  return this.currentDay;
}
  onBook() {
    this.dateModel = new DateModel();

    if (this.checkedin.value === null) {
      this.dateModel.checkedin = this.year + '-' + this.month + 1 + '-' + this.day;
    } else {
      this.dateModel.checkedin = this.getDateFormat(this.checkedin.value);
    }

    if (this.checkedout.value === null) {
      this.dateModel.checkout =  this.year2 + '-' + this.month2 + 1 + '-' + this.day2;
    } else {
      this.dateModel.checkout = this.getDateFormat(this.checkedout.value);
    }


    const navigationExtras: NavigationExtras = {
      queryParams: {
          dateob: JSON.stringify(this.dateModel),
      }
    };

    this.router.navigate(['/booking/choose'], navigationExtras );
  }
  getDateFormat(dateString: string) {
    const yearAndMonth = dateString.split('-', 3);
    return yearAndMonth[0] + '-' + yearAndMonth[1] + '-' + yearAndMonth[2].split(' ', 1);
  }
}
