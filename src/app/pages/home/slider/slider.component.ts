import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import {
  NgbCalendar,
  NgbCarouselConfig,
  NgbDate,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { DateModel } from 'src/app/model/dateModel';
import { Property } from 'src/app/model/property';
import { TokenStorage } from 'src/app/token.storage';

export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : null;
  }
}
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [
    NgbCarouselConfig,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ], // add NgbCarouselConfig to the component providers
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

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  dateModel: DateModel;

  minToDate: Date;
  maxToDate: Date;

  minFromDate: Date;
  maxFromDate: Date;
  toDateMinMilliSeconds: number;
  toDateMaxMilliSeconds: number;
  fromDateMinMilliSeconds: number;
  fromDateMaxMilliSeconds: number;

  placement = 'top';

  checkIn: NgbDate;
  checkOut: NgbDate;
  guest: number = 1;
  noOfRooms: number = 1;

  CheckIn: FormControl = new FormControl();
  CheckOut: FormControl = new FormControl();
  Guest: FormControl = new FormControl();
  NoOfRooms: FormControl = new FormControl();

  form = new FormGroup({
    CheckIn: new FormControl(),
    CheckOut: new FormControl(),
    Guest: new FormControl(),
    NoOfRooms: new FormControl(),
  });

  slideImage = [
    {
      imageUrl: 'assets/images/banner_bg3.jpg',
      title: '',
    },
    {
      imageUrl: 'assets/images/banner_bg1.jpg',
      title: '',
    },
    {
      imageUrl: 'assets/images/404_bg.jpg',
      title: '',
    },
  ];
  slideConfig = {
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
          centerPadding: '0',
        },
      },
      {
        breakpoint: 1025,
        settings: {
          centerPadding: '0',
          slidesToShow: 1,
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

  constructor(
    public config: NgbCarouselConfig,
    public router: Router,
    public token: TokenStorage,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,
    public apiService: ApiService,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>
  ) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {}
  getProperty() {
    this.apiService.getPropertyDetailsByPropertyId(PROPERTY_ID).subscribe(
      (response) => {
        this.property = response.body;
        this.token.saveProperty(this.property);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
        }
      }
    );
  }
  submitForm(searchForm) {}
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
  getDateFormat(dateString: string) {
    const yearAndMonth = dateString.split('-', 3);
    return (
      yearAndMonth[0] +
      '-' +
      yearAndMonth[1] +
      '-' +
      yearAndMonth[2].split(' ', 1)
    );
  }
  model(checkIn) {
    console.log('model: ', checkIn);
  }
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
