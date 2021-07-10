import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, FormGroupDirective, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { Property } from 'src/app/property/property';
import { TokenStorage } from 'src/app/token.storage';
import { DateModel } from '../model/dateModel';
import {
  NgbCalendar,
  NgbCarouselConfig,
  NgbDate,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';


/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
 @Injectable()
 export class CustomAdapter extends NgbDateAdapter<string> {

   readonly DELIMITER = '-';
// string To NgbDate
   fromModel(value: string | null): NgbDateStruct | null {
     if (value) {
       let date = value.split(this.DELIMITER);
       return {
         day : parseInt(date[2], 10),
         month : parseInt(date[1], 10),
         year : parseInt(date[0], 10)
       };
     }
     return null;
   }
//NgbDate To string
   toModel(date: NgbDateStruct | null): string | null {
     return date ? date.year + this.DELIMITER + date.month + this.DELIMITER +  date.day: null;
   }
 }

 /**
  * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
  */
 @Injectable()
 export class CustomDateParserFormatter extends NgbDateParserFormatter {

   readonly DELIMITER = '/';

   parse(value: string): NgbDateStruct | null {
     if (value) {
       let date = value.split(this.DELIMITER);
       return {
         day : parseInt(date[0], 10),
         month : parseInt(date[1], 10),
         year : parseInt(date[2], 10)
       };
     }
     return null;
   }

   format(date: NgbDateStruct | null): string {
     return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
   }
 }
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class SliderComponent implements OnInit {
  property: Property;
  currentDay: string;
  day: number;
  year: number;
  month: number;

  day2: number;
  year2: number;
  month2: number;

  fromDate: string;
  dateModel: DateModel;

  minToDate: Date;
  maxToDate: Date;

  minFromDate: Date;
  maxFromDate: Date;
  toDateMinMilliSeconds: number;
  toDateMaxMilliSeconds: number;
  fromDateMinMilliSeconds: number;
  fromDateMaxMilliSeconds: number;

  checkIn: NgbDate;
  checkOut: NgbDate;
  guest: number = 1;
  noOfRooms: number = 1;
  noOfChildren: number = 1;
  // checkIn: FormControl = new FormControl();
  // checkOut: FormControl = new FormControl();

  CheckIn: FormControl = new FormControl();
  CheckOut: FormControl = new FormControl();
  Guest: FormControl = new FormControl();
  NoOfRooms: FormControl = new FormControl();
  NoOfChildren: FormControl = new FormControl();

  form = new FormGroup({
    CheckIn: new FormControl(),
    CheckOut: new FormControl(),
    Guest: new FormControl(),
    NoOfRooms: new FormControl(),
    NoOfChildren: new FormControl()
  });


  monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  galleryImage = [
    {
      title: '1',
      image: 'assets/images/slides/hero-1.jpg',
    },
    {
      title: '2',
      image: 'assets/images/slides/hero-2.jpg',
    },
    {
      title: '3',
      image: 'assets/images/slides/hero-3.jpg',
    },

  ];
  slideConfig =
  {
     centerMode: true,
     centerPadding: '0',
     slidesToShow: 1,
     autoplay: true,
     autoplaySpeed: 2000,
     arrows: false,
     responsive: [
        {
          breakpoint: 1367,
          settings: {
            centerPadding: '0'
          }
        },
        {
          breakpoint: 1025,
          settings: {
            centerPadding: '0',
            slidesToShow: 1
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
  constructor(
    private router: Router,
    private token :TokenStorage,
    private apiService: ApiService,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>
    ) { }


  ngOnInit() {
    this.checkincheckoutDate();
    this.getProperty();
    this.getToday();
   // this.checkinDateInterval();
  }
  getToday() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday());
  }
  setCheckInDate(checkIn){
    const date= this.dateAdapter.fromModel(checkIn);
    this.day = date.day;
    this.month = date.month;
    this.year = date.year;
    // const currentDate: Date = new Date(this.dateAdapter.toModel(checkIn));
    // const currentDate2: Date = new Date('2022-05-20');
    // console.log(date);
    // this.day = this.getDay(currentDate);
    // this.year = String(currentDate.getFullYear());
    // this.month = currentDate.getMonth();
  }
  setCheckOutDate(checkOut){

    const date= this.dateAdapter.fromModel(checkOut);
    this.day2 = date.day;
    this.month2 = date.month;
    this.year2 = date.year;
  }
  checkincheckoutDate() {
    const currentDate: Date = new Date();
    this.day = Number(this.getDay(currentDate));
    this.year = currentDate.getFullYear();
    this.month = currentDate.getMonth();


    const afterDate: Date = new Date();
    afterDate.setDate(currentDate.getDate() + 1);

    this.day2 = Number(this.getDay(afterDate));
    this.year2 = afterDate.getFullYear();
    this.month2 = afterDate.getMonth();
  }

  // checkinDateInterval()
  // {
  //   let currentDate: Date = new Date();

  //   const fromDateMilliSeconds = currentDate.getTime();
  //   this.fromDateMinMilliSeconds = fromDateMilliSeconds;
  //   this.fromDateMaxMilliSeconds = fromDateMilliSeconds + (86400000 * 30*6);
  //   this.minFromDate = new Date(this.fromDateMinMilliSeconds);
  //   this.maxFromDate = new Date(this.fromDateMaxMilliSeconds);
  // }


  getDay(date: Date) {
    if (date.getDate().toString().length == 1) {
        this.currentDay = '0' + date.getDate();
    } else {
        this.currentDay = '' + date.getDate();
    }

    return this.currentDay;
  }

  // onBook() {
  //   this.dateModel = new DateModel();

  //   if (this.checkIn.value === null) {
  //     this.dateModel.checkIn = this.year + '-' + (this.month + 1) + '-' + this.day;
  //   } else {
  //     this.dateModel.checkIn = this.getDateFormat(this.checkIn.value);
  //   }

  //   if (this.checkOut.value === null) {
  //     this.dateModel.checkOut =  this.year2 + '-' + (this.month2 + 1) + '-' + this.day2;
  //   } else {
  //     this.dateModel.checkOut = this.getDateFormat(this.checkOut.value);
  //   }
  //   if (this.guest === null) {
  //     this.dateModel.guest = 1;
  //   } else {
  //     this.dateModel.guest = this.guest;
  //   }

  //   this.dateModel.noOfRooms = 1;


    // console.log(' this.dateModel '+JSON.stringify( this.dateModel));

  //   const navigationExtras: NavigationExtras = {
  //     queryParams: {
  //         dateob: JSON.stringify(this.dateModel),
  //     }
  //   };

  //   this.router.navigate(['/booking/choose'], navigationExtras );
  // }
  onBook() {
    this.dateModel = new DateModel();

    if (this.checkIn === null) {
      this.dateModel.checkIn =
        this.year + '-' + (this.month + 1) + '-' + this.day;
    } else {
      // this.dateModel.checkIn = this.getDateFormat(this.checkIn);
      this.dateModel.checkIn = this.getDateFormatYearMonthDay(
        this.checkIn.day,
        this.checkIn.month,
        this.checkIn.year
      );
    }

    if (this.checkOut === null) {
      this.dateModel.checkOut =
        this.year2 + '-' + (this.month2 + 1) + '-' + this.day2;
    } else {
      // this.dateModel.checkOut = this.getDateFormat(this.checkOut);
      this.dateModel.checkOut = this.getDateFormatYearMonthDay(
        this.checkOut.day,
        this.checkOut.month,
        this.checkOut.year
      );
    }
    if (this.guest === null) {
      this.dateModel.guest = 1;
    } else {
      this.dateModel.guest = this.guest;
    }
    if (this.noOfChildren === null) {
      this.dateModel.noOfChildren = 1;
    } else {
      this.dateModel.noOfChildren = this.noOfChildren;
    }
    if (this.noOfRooms === null) {
      this.dateModel.noOfRooms = 1;
    } else {
      this.dateModel.noOfRooms = this.noOfRooms;
    }
    console.log(' this.dateModel ' + JSON.stringify(this.dateModel));

    const navigationExtras: NavigationExtras = {
      queryParams: {
        dateob: JSON.stringify(this.dateModel),
      },
    };
    this.router.navigate(['/booking/choose'], navigationExtras);
  }
  getDateFormat(dateString: string) {
    const yearAndMonth = dateString.split('-', 3);
    return yearAndMonth[0] + '-' + yearAndMonth[1] + '-' + yearAndMonth[2].split(' ', 1);
  }

  checkInEvent() {
    const currentDate: Date = new Date(this.CheckIn.value);

    const afterDate: Date = new Date();
    afterDate.setDate(currentDate.getDate() + 1);
    afterDate.setFullYear(currentDate.getFullYear());
    afterDate.setMonth(currentDate.getMonth());

    this.day2 = Number(this.getDay(afterDate));
    this.year2 = afterDate.getFullYear();
    this.month2 = afterDate.getMonth();
  }
  guestEvent(){
    this.dateModel.guest = this.guest;
  }
  getProperty() {
    this.apiService.getPropertyDetailsByPropertyId(PROPERTY_ID).subscribe(response => {

      this.property = response.body;
      this.token.savePropertyName(this.property.name);
    },
      error => {
        if (error instanceof HttpErrorResponse) {

        }
      }
  );
  }

  getDateFormatYearMonthDay(
    day12: number,
    month12: number,
    year12: number
  ): string {
    const year = year12;
    const date = day12;

    const month = month12;

    let month1;
    let day1;
    if (Number(month) < 10) {
      month1 = `0${month}`;
    } else {
      month1 = `${month}`;
    }
    if (Number(date) < 10) {
      day1 = `0${date}`;
    } else {
      day1 = `${date}`;
    }

    return `${year}-${month1}-${day1}`;
  }
}
