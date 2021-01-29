import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/room/room';
import { PROPERTY_ID, ApiService } from 'src/app/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DateModel } from './../../home/model/dateModel';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Booking } from '../../../booking/booking';
import {
  FormControl,
  FormGroup,
  NgForm,
  FormGroupDirective,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { TokenStorage } from '../../../token.storage';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css'],
})
export class NewBookingComponent implements OnInit {
  rooms: Room[];
  room: Room;
  dateModel: DateModel;
  booking: Booking;

  daySelected: string;
  yearSelected: string;
  monthSelected: number;

  daySelected2: string;
  yearSelected2: string;
  monthSelected2: number;

  isAvailableChecked: boolean;
  currentDay: string;

  monthArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  firstName: FormControl = new FormControl('', Validators.required);
  lastName: FormControl = new FormControl('', Validators.required);
  bookingEmail: FormControl = new FormControl('', Validators.nullValidator);
  bookingContact: FormControl = new FormControl('', Validators.nullValidator);
  noOfPersons: FormControl = new FormControl('', Validators.required);
  noOfRooms: FormControl = new FormControl('', Validators.required);
  //termAndConditions : FormControl = new FormControl("",Validators.required);
  checkIn: FormControl = new FormControl();
  checkOut: FormControl = new FormControl();

  onBookingForm: FormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    bookingEmail: this.bookingEmail,
    bookingContact: this.bookingContact,
    noOfPersons: this.noOfPersons,
    noOfRooms: this.noOfRooms,
    // termAndConditions : this.termAndConditions,
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    public token: TokenStorage,
    private acRoute: ActivatedRoute
  ) {
    this.dateModel = new DateModel();
    this.booking = new Booking();
    this.room = new Room();
    this.acRoute.queryParams.subscribe((params) => {
      if (params['dateob'] != undefined) {
        this.dateModel = JSON.parse(params['dateob']);

        this.room = this.dateModel.room;

        console.log('this.dateModel : ' + JSON.stringify(this.dateModel));

        if (
          this.dateModel.checkIn != undefined &&
          this.dateModel.checkOut != undefined
        ) {
          this.isAvailableChecked = true;
          this.getCheckInDateFormat(this.dateModel.checkIn);
          this.getcheckOutDateFormat(this.dateModel.checkOut);
        } else {
          this.isAvailableChecked = false;
          this.checkincheckOutDate();
        }
      }
    });
  }

  ngOnInit() {

  }

  checkincheckOutDate() {
    let currentDate: Date = new Date();
    this.daySelected = this.getDay(currentDate);
    this.yearSelected = String(currentDate.getFullYear());
    this.monthSelected = currentDate.getMonth();

    let afterDate: Date = new Date();
    afterDate.setDate(currentDate.getDate() + 1);

    this.daySelected2 = this.getDay(afterDate);
    this.yearSelected2 = String(afterDate.getFullYear());
    this.monthSelected2 = afterDate.getMonth();
  }

  getDay(date: Date) {
    if (date.getDate().toString().length == 1) {
      this.currentDay = '0' + date.getDate();
    } else {
      this.currentDay = '' + date.getDate();
    }

    return this.currentDay;
  }

  checkedOutEvent() {
    this.isAvailableChecked = false;
  }

  checkInEvent() {
    this.isAvailableChecked = false;
    let currentDate: Date = new Date(this.checkIn.value);

    let afterDate: Date = new Date();
    afterDate.setDate(currentDate.getDate() + 1);
    afterDate.setFullYear(currentDate.getFullYear());
    afterDate.setMonth(currentDate.getMonth());

    this.daySelected2 = this.getDay(afterDate);
    this.yearSelected2 = String(afterDate.getFullYear());
    this.monthSelected2 = afterDate.getMonth();
  }

  getRoomByDate() {
    if (this.checkIn.value === null) {
      this.dateModel.checkIn =
        this.yearSelected +
        '-' +
        this.monthSelected +
        1 +
        '-' +
        this.daySelected;
    } else {
      this.dateModel.checkIn = this.getDateFormat(this.checkIn.value);
    }

    if (this.checkOut.value === null) {
      this.dateModel.checkOut =
        this.yearSelected2 +
        '-' +
        this.monthSelected2 +
        1 +
        '-' +
        this.daySelected2;
    } else {
      this.dateModel.checkOut = this.getDateFormat(this.checkOut.value);
    }

    if (
      this.dateModel.checkOut != undefined &&
      this.dateModel.checkIn != undefined
    ) {
      this.isAvailableChecked = true;
    }
  }

  getDateFormat(dateString: string) {
    let yearAndMonth = dateString.split('-', 3);
    return (
      yearAndMonth[0] +
      '-' +
      yearAndMonth[1] +
      '-' +
      yearAndMonth[2].split(' ', 1)
    );
  }

  onChangeRoom($event, roomNumber: number) {
    if (this.booking.noOfRooms != undefined) {
      if (this.booking.noOfRooms > roomNumber) {
        this.booking.noOfRooms = roomNumber;
        // this.noOfRooms.reset();
        this.noOfRooms.setValue(roomNumber);
      }
    }
  }

  onChangePerson($event, personNumber: number) {
    if (this.booking.noOfPersons != undefined) {
      if (this.booking.noOfPersons > personNumber) {
        this.booking.noOfPersons = personNumber;
        this.noOfPersons.setValue(personNumber);
      }
    }
  }

  onCheckOut() {
    this.dateModel.booking = this.booking;

    let navigationExtras: NavigationExtras = {
      queryParams: {
        dateob: JSON.stringify(this.dateModel),
      },
    };
    this.router.navigate(['/booking/payment'], navigationExtras);
  }

  getCheckInDateFormat(dateString: string) {
    let yearAndMonth = dateString.split('-', 3);
    this.daySelected = String(yearAndMonth[2].split(' ', 1));
    this.yearSelected = yearAndMonth[0];
    this.monthSelected = parseInt(yearAndMonth[1]) - 1;
  }

  getcheckOutDateFormat(dateString: string) {
    let yearAndMonth = dateString.split('-', 3);
    this.daySelected2 = String(yearAndMonth[2].split(' ', 1));
    this.yearSelected2 = yearAndMonth[0];
    this.monthSelected2 = parseInt(yearAndMonth[1]) - 1;
  }
}
