import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { Room } from 'src/app/room/room';
import { TokenStorage } from 'src/app/token.storage';
import { BankAccount } from '../../home/model/BankAccount';
import { Booking } from '../../home/model/booking';
import { DateModel } from '../../home/model/dateModel';
import { MobileWallet } from '../../home/model/mobileWallet';
import { Property } from '../../home/model/property';
import { RoomRatePlans } from '../../home/model/roomRatePlans';


@Component({
  selector: 'app-choose-room',
  templateUrl: './choose-room.component.html',
  styleUrls: ['./choose-room.component.css'],
})
export class ChooseRoomComponent implements OnInit {
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  rooms: Room[];
  dateModel: DateModel;
  selectedIndex: number;
  daySelected: string;
  yearSelected: string;
  monthSelected: number;
  mobileWallet: MobileWallet;
  bankAccount: BankAccount;
  daySelected2: string;
  yearSelected2: string;
  monthSelected2: number;
  booking: Booking;
  currentDay: string;
  checkAvailabilityStatus: boolean;
  checkAvailabilityStatusName: string;
  checkAvailabilityStatusHide: boolean;
  planDetails: RoomRatePlans;

  property: Property;

  taxPercentage: number = 0;

  adults: number = 1;
  children: number = 0;
  noOfrooms: number = 1;
  DiffDate;
  enddate;
  startDate;
  planSelected: boolean = false;

  planAmount = 0;
  extraPersonRate = 0;
  maxSelectRoom = 1;
  maxOccupancy = 2;
  // businessUser: BusinessUser;
  // planDetails:FormControl = new FormControl('', Validators.nullValidator);

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
  roomsAndOccupancy: boolean = false;
  hoveredDate: NgbDate | null = null;

  bookingMinDate: NgbDate | null;
  bookingMaxDate: NgbDate | null;
  bookingRoomPrice: number;
  PlanRoomPrice: number;
  constructor(
    private apiService: ApiService,
    public token: TokenStorage,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    public formatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,
    private acRoute: ActivatedRoute
  ) {
    this.dateModel = new DateModel();
    this.booking = new Booking();
    // this.businessUser = new BusinessUser();
    // this.getRoom();

    this.acRoute.queryParams.subscribe((params) => {
      if (params['dateob'] != undefined) {
        this.dateModel = JSON.parse(params['dateob']);
        this.getCheckInDateFormat(this.dateModel.checkIn);
        this.getCheckOutDateFormat(this.dateModel.checkOut);
        this.booking.fromDate = this.dateModel.checkIn;
        this.booking.toDate = this.dateModel.checkOut;
        this.booking.noOfRooms = this.dateModel.noOfRooms;
        this.booking.noOfPersons = this.dateModel.guest;
        this.booking.noOfChildren = this.dateModel.noOfChildren;
        this.adults = this.booking.noOfPersons;
        this.children = this.booking.noOfChildren;
        this.noOfrooms = this.booking.noOfRooms;
        this.fromDate = new NgbDate(
          this.mileSecondToNGBDate(this.booking.fromDate).year,
          this.mileSecondToNGBDate(this.booking.fromDate).month,
          this.mileSecondToNGBDate(this.booking.fromDate).day
        );
        this.toDate = new NgbDate(
          this.mileSecondToNGBDate(this.booking.toDate).year,
          this.mileSecondToNGBDate(this.booking.toDate).month,
          this.mileSecondToNGBDate(this.booking.toDate).day
        );
        this.getDiffDate(this.toDate, this.fromDate);
        this.getAvailableRoom();
      } else {
        // this.dateModel.checkIn = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        // this.dateModel.checkOut = formatDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd', 'en');
        // this.getCheckInDateFormat(this.dateModel.checkIn);
        // this.getCheckOutDateFormat(this.dateModel.checkOut);
        // this.booking.fromDate = this.dateModel.checkIn;
        // this.booking.toDate = this.dateModel.checkOut;
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);
        this.booking.fromDate = this.getDateFormatYearMonthDay(
          this.fromDate.day,
          this.fromDate.month,
          this.fromDate.year
        );
        this.booking.toDate = this.getDateFormatYearMonthDay(
          this.toDate.day,
          this.toDate.month,
          this.toDate.year
        );
        this.booking.noOfRooms = 1;
        this.booking.noOfPersons = 1;
        this.booking.noOfChildren = 1;
        this.fromDate = new NgbDate(
          this.mileSecondToNGBDate(this.booking.fromDate).year,
          this.mileSecondToNGBDate(this.booking.fromDate).month,
          this.mileSecondToNGBDate(this.booking.fromDate).day
        );
        this.toDate = new NgbDate(
          this.mileSecondToNGBDate(this.booking.toDate).year,
          this.mileSecondToNGBDate(this.booking.toDate).month,
          this.mileSecondToNGBDate(this.booking.toDate).day
        );
        this.getDiffDate(this.toDate, this.fromDate);
        this.getAvailableRoom();
      }
    });
    this.maxSelectRoom = this.token.getProperty().numberOfRooms;
    this.maxOccupancy = this.token.getProperty().maximumOccupancy;
  }

  ngOnInit() {
    //this.checkincheckoutDate();

  }
  toggleRoomsAndOccupancy() {
    if (this.roomsAndOccupancy == false) {
      this.roomsAndOccupancy = true;
    } else if (this.roomsAndOccupancy == true) {
      this.roomsAndOccupancy = false;
    }
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.getDiffDate(this.toDate, this.fromDate);
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
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
  mileSecondToNGBDate(date: string) {
    const dsd = new Date(date);
    const year = dsd.getFullYear();
    const day = dsd.getDate();
    const month = dsd.getMonth() + 1;
    return { year: year, month: month, day: day };
  }
  getDiffDate(toDate, fromDate) {
    this.startDate = new Date(fromDate.year, fromDate.month - 1, fromDate.day);
    this.enddate = new Date(toDate.year, toDate.month - 1, toDate.day);

    // console.log('this.fromDate: ', this.startDate);
    // console.log('this.toDate: ', this.enddate);
    this.DiffDate = Math.floor(
      (Date.UTC(
        this.enddate.getFullYear(),
        this.enddate.getMonth(),
        this.enddate.getDate()
      ) -
        Date.UTC(
          this.startDate.getFullYear(),
          this.startDate.getMonth(),
          this.startDate.getDate()
        )) /
        (1000 * 60 * 60 * 24)
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
  onRoomBook(room, index) {
    // this.dateModel.room = room;
    this.selectedIndex = index;

    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     dateob: JSON.stringify(this.dateModel),
    //   },
    // };
    // this.router.navigate(['/booking/booking'], navigationExtras);
  }
  hasPercentage(roomOnlyPrice, planAmount) {
    if (((roomOnlyPrice - planAmount) / roomOnlyPrice) * 100 > 0) {
      return true;
    } else {
      return false;
    }
  }
  onPlanSelected(plan, room) {
    this.checkAvailabilityStatus = false;
    this.checkAvailabilityStatusHide = true;
    this.checkAvailabilityStatusName = undefined;
    // if(this.adults > 2){
    //   this.adults = 2;
    // }
    // this.children = 0;
    // this.noOfrooms = 1;
    // if(room.ratesAndAvailabilityDtos.noOfAvailable * room.maximumOccupancy < this.adults){
    //   this.adults = room.ratesAndAvailabilityDtos.noOfAvailable * room.maximumOccupancy;

    // }
    // this.noOfrooms =  Number((this.adults / room.maximumOccupancy).toFixed(0));
    // if(plan.noOfAvailable < this.noOfrooms){
    //   this.noOfrooms = plan.noOfAvailable;
    // }
    if (this.booking.noOfPersons > room.maximumOccupancy) {
      this.extraPersonRate = plan.extraChargePerPerson;
    }
    this.booking.extraPersonCharge = this.extraPersonRate;
    if (
      plan.minimumOccupancy * this.booking.noOfRooms <
      this.booking.noOfPersons
    ) {
      if (plan.extraChargePerPerson !== 0) {
        this.booking.noOfExtraPerson =  this.booking.noOfPersons - plan.minimumOccupancy * this.booking.noOfRooms;
        this.booking.extraPersonCharge = plan.extraChargePerPerson * this.booking.noOfExtraPerson * this.DiffDate;
      } else {
        this.booking.extraPersonCharge = 0;
      }
    } else {
      this.booking.noOfExtraPerson = 0;
      this.booking.extraPersonCharge = 0;
    }
    if ( plan.noOfChildren * this.booking.noOfRooms < this.booking.noOfChildren ) {
      if (plan.extraChargePerChild !== 0) {
        this.booking.noOfExtraChild = this.booking.noOfChildren - (plan.noOfChildren * this.booking.noOfRooms);
        this.booking.extraChildCharge = plan.extraChargePerChild * this.booking.noOfExtraChild * this.DiffDate;
      } else {
        this.booking.extraChildCharge = 0;
      }
    } else {
      this.booking.noOfExtraChild = 0;
      this.booking.extraChildCharge = 0;
    }

    this.booking.netAmount = (plan.amount * this.DiffDate * this.noOfrooms) + this.booking.extraPersonCharge + this.booking.extraChildCharge;
    // if (this.businessUser.taxDetails.length > 0) {
    //   this.taxPercentage = this.businessUser.taxDetails[0].percentage;
    // }
    if (plan != undefined && plan.amount != undefined) {
      this.bookingRoomPrice = (plan.amount * this.DiffDate * this.booking.noOfRooms) + this.booking.extraPersonCharge + this.booking.extraChildCharge;
      this.PlanRoomPrice = plan.amount * this.DiffDate * this.booking.noOfRooms;
    } else {
      this.bookingRoomPrice = 0;
      this.PlanRoomPrice = 0;
    }
    // if (this.businessUser.taxDetails[0].taxSlabsList.length > 0) {
    //   this.businessUser.taxDetails[0].taxSlabsList.forEach((element) => {
    //     if (
    //       element.maxAmount > this.booking.netAmount &&
    //       element.minAmount < this.booking.netAmount
    //     ) {
    //       this.taxPercentage = element.percentage;
    //     } else if (element.maxAmount < this.booking.netAmount) {
    //       this.taxPercentage = element.percentage;
    //     }
    //   });
    // }
    this.booking.taxPercentage = this.taxPercentage;
    this.planDetails = plan;
    this.booking.planCode = plan.code;
    this.booking.roomRatePlanName = plan.name;
    this.booking.roomPrice = plan.amount;
    this.planSelected = true;
    this.planAmount = plan.amount;


    // this.fromDate = undefined;
    // this.toDate = undefined;
    // this.booking.fromDate = undefined;
    // this.booking.toDate = undefined;
    console.log(JSON.stringify(this.booking));
    console.log(JSON.stringify(this.checkAvailabilityStatusHide));
    this.changeDetectorRefs.detectChanges();
    // this.checkingAvailability();
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
  bookRoomNow() {
    this.booking.fromDate = this.getDateFormat(this.booking.fromDate);
    this.booking.toDate = this.getDateFormat(this.booking.toDate);
    // this.booking.noOfRooms = this.noOfrooms;
    // this.booking.noOfPersons = this.adults;
    // this.booking.noOfExtraPerson = this.children;

    // this.booking.netAmount =
    this.changeDetectorRefs.detectChanges();

    this.mobileWallet = this.property.mobileWallet;
    this.bankAccount = this.property.bankAccount;
    //  Logger.log(' this.property ===='+JSON.stringify( this.property));
    if (this.property.taxDetails.length > 0) {
      this.taxPercentage = this.property.taxDetails[0].percentage;
    }
    if (this.property.taxDetails[0].taxSlabsList.length > 0) {
      this.property.taxDetails[0].taxSlabsList.forEach((element) => {
        if (
          element.maxAmount > this.booking.roomPrice &&
          element.minAmount < this.booking.roomPrice
        ) {
          this.taxPercentage = element.percentage;
        } else if (element.maxAmount < this.booking.roomPrice) {
          this.taxPercentage = element.percentage;
        }
      });
    }

    this.booking.netAmount =
      this.booking.roomPrice * this.booking.noOfRooms * this.DiffDate;
    this.booking.discountAmount = 0;
    // this.booking.totalAmount = this.booking.netAmount + ((this.booking.netAmount * this.taxPercentage) / 100) - this.booking.discountAmount;
    this.booking.gstAmount =
      (this.booking.netAmount * this.booking.taxPercentage) / 100;
    this.booking.totalAmount =
      this.booking.netAmount +
      this.booking.gstAmount -
      this.booking.discountAmount;
    console.log('book now ', JSON.stringify(this.booking.netAmount));
    this.token.saveBookingData(this.booking);
    this.router.navigate(['/booking/booking']);
  }
  getAvailableRoom() {
    this.booking.fromDate = this.getDateFormat(this.booking.fromDate);
    this.booking.toDate = this.getDateFormat(this.booking.toDate);
    this.apiService.checkAvailabilityByID(this.booking).subscribe(
      (response) => {
        this.property = response.body;
        this.token.saveProperty(this.property);
        this.rooms = response.body.roomList;
        this.checkAvailabilityStatus = response.body.available;
        this.booking.bookingAmount = response.body.bookingAmount;
        this.booking.extraPersonCharge = response.body.extraPersonCharge;
        // this.selectedRoomMaximumOccupancy = response.body.noOfPersons;

        if (response.body.available == true) {
          this.checkAvailabilityStatusName = 'Available';
        } else {
          this.checkAvailabilityStatusName = 'Not Available';
        }

        console.log('checkAvailability ' + JSON.stringify(response.body));
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
        }
      }
    );
  }
  getRoom() {
    this.apiService.getRoomDetailsByPropertyId(PROPERTY_ID).subscribe(
      (response) => {
        console.log(
          'response room choose room ' + JSON.stringify(response.body)
        );
        this.rooms = response.body;
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
        }
      }
    );
  }

  getRoomByDate(fromDate: string, toDate: string) {
    this.apiService
      .getRoomDetailsByPropertyIdAndDate(PROPERTY_ID, fromDate, toDate)
      .subscribe(
        (response) => {
          this.rooms = response.body;
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
          }
        }
      );
  }

  getCheckInDateFormat(dateString: string) {
    var yearAndMonth = dateString.split('-', 3);
    this.daySelected = String(yearAndMonth[2].split(' ', 1));
    this.yearSelected = yearAndMonth[0];
    this.monthSelected = parseInt(yearAndMonth[1]) - 1;
  }

  getCheckOutDateFormat(dateString: string) {
    var yearAndMonth = dateString.split('-', 3);
    this.daySelected2 = String(yearAndMonth[2].split(' ', 1));
    this.yearSelected2 = yearAndMonth[0];
    this.monthSelected2 = parseInt(yearAndMonth[1]) - 1;
  }

}
