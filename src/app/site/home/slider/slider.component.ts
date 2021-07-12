import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, FormGroupDirective, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { Property } from 'src/app/site/home/model/property';
import { TokenStorage } from 'src/app/token.storage';
import { DateModel } from '../model/dateModel';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  property: Property;
  currentDay: string;
  day: string;
  year: string;
  month: number;

  day2: string;
  year2: string;
  month2: number;

  placement = 'top';
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
  hoveredDate: NgbDate | null = null;
  todayDate: NgbDate | null;

  // checkIn: FormControl = new FormControl();
  // checkOut: FormControl = new FormControl();


  guest: number = 1;
  noOfRooms: number = 1;
  noOfChildren: number = 1;

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
    NoOfChildren: new FormControl(),
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
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
    ) { 
      this.checkIn = this.calendar.getToday();
    
      this.checkOut = this.calendar.getNext(this.calendar.getToday(), 'd', 1);
    }


  ngOnInit() {
    this.checkincheckoutDate();
    this.getProperty();
   // this.checkinDateInterval();
   this.setCheckInDate(this.checkIn);
    this.setCheckOutDate(this.checkOut);
  }
  setCheckInDate(checkIn) {
    this.day = checkIn.day;
     this.month = checkIn.month - 1;
     this.year = checkIn.year;
     // this.dateModel.checkIn = checkIn;
     this.day2 = checkIn.day + 1;
     this.month2 = checkIn.month - 1;
     this.year2 = checkIn.year;
     // this.dateModel.checkOut = checkOut;
   }
   setCheckOutDate(checkOut) {
     this.day2 = checkOut.day;
     this.month2 = checkOut.month - 1;
     this.year2 = checkOut.year;
     // this.dateModel.checkOut = checkOut;
   }

   onDateSelection(date: NgbDate) {
    if (!this.checkIn && !this.checkOut) {
      this.checkIn = date;
      this.setCheckInDate(this.checkIn);
    } else if (
      this.checkIn &&
      !this.checkOut 
      &&
      date &&
      date.after(this.checkIn)
    ) {
      this.checkOut = date;
      // let dateObj = new Date(this.checkOut.year, this.checkOut.month, this.checkOut.day);
      // this.form.controls.CheckIn.setValue(dateObj);
      this.setCheckOutDate(this.checkOut);
    } else {
      this.checkOut = null;
      this.checkIn = date;
      // let dateObj = new Date(this.checkIn.year, this.checkIn.month, this.checkIn.day);
      // this.form.controls.CheckOut.setValue(dateObj);
      this.setCheckInDate(this.checkIn);
    }

  }

  isHovered(date: NgbDate) {
    return (
      this.checkIn &&
      !this.checkOut &&
      this.hoveredDate &&
      date.after(this.checkIn) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return (
      this.checkOut && date.after(this.checkIn) && date.before(this.checkOut)
    );
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.checkIn) ||
      (this.checkOut && date.equals(this.checkOut)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
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

  onBook() {
    this.dateModel = new DateModel();

    if (this.checkIn === null) {
      this.dateModel.checkIn =
        this.year + "-" + (this.month + 1) + "-" + this.day;
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
        this.year2 + "-" + (this.month2 + 1) + "-" + this.day2;
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
    console.log(" this.dateModel " + JSON.stringify(this.dateModel));

    const navigationExtras: NavigationExtras = {
      queryParams: {
        dateob: JSON.stringify(this.dateModel),
      },
    };
    this.router.navigate(["/booking/choose"], navigationExtras);
  }

  getDateFormat(dateString: string) {
    const yearAndMonth = dateString.split('-', 3);
    return yearAndMonth[0] + '-' + yearAndMonth[1] + '-' + yearAndMonth[2].split(' ', 1);
  }

  // checkInEvent() {
  //   const currentDate: Date = new Date(this.checkIn.value);

  //   const afterDate: Date = new Date();
  //   afterDate.setDate(currentDate.getDate() + 1);
  //   afterDate.setFullYear(currentDate.getFullYear());
  //   afterDate.setMonth(currentDate.getMonth());

  //   this.day2 = this.getDay(afterDate);
  //   this.year2 = String(afterDate.getFullYear());
  //   this.month2 = afterDate.getMonth();
  // }
  guestEvent(){
    this.dateModel.guest = this.guest;
    this.dateModel.noOfChildren = this.noOfChildren;
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
