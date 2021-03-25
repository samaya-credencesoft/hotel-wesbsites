import { BankAccount } from './../../home/model/BankAccount';
import { MobileWallet } from './../../home/model/mobileWallet';
import { Booking } from "../../home/model/booking";
import { TokenStorage } from "src/app/token.storage";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Room } from "src/app/room/room";
import { PROPERTY_ID, ApiService } from "src/app/api.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { DateModel } from "./../../home/model/dateModel";
import { NavigationExtras } from "@angular/router";
import { Router } from "@angular/router";
import { RoomRatePlans } from "../../home/model/roomRatePlans";
import { Property } from '../../home/model/property';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-choose-room",
  templateUrl: "./choose-room.component.html",
  styleUrls: ["./choose-room.component.css"],
})
export class ChooseRoomComponent implements OnInit {

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  rooms: Room[];
  dateModel: DateModel;
  selectedIndex:number;
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
  // planDetails:FormControl = new FormControl('', Validators.nullValidator);

  monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  constructor(
    private apiService: ApiService,
    public token: TokenStorage,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private acRoute: ActivatedRoute
  ) {
    this.dateModel = new DateModel();
    this.booking = new Booking();
    // this.getRoom();

    this.acRoute.queryParams.subscribe((params) => {
      if (params["dateob"] != undefined) {
        this.dateModel = JSON.parse(params["dateob"]);

        //  this.getRoomByDate( this.dateModel.checkIn  ,this.dateModel.checkout  );

        this.getCheckInDateFormat(this.dateModel.checkIn);
        this.getCheckOutDateFormat(this.dateModel.checkOut);
        this.booking.fromDate = this.dateModel.checkIn;
        this.booking.toDate = this.dateModel.checkOut;
        this.booking.noOfRooms = this.dateModel.noOfRooms;
        this.booking.noOfPersons = this.dateModel.guest;
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
  }

  ngOnInit() {
    //this.checkincheckoutDate();
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
  onRoomBooking(room, index) {
    this.dateModel.room = room;
    this.selectedIndex = index;

    let navigationExtras: NavigationExtras = {
      queryParams: {
        dateob: JSON.stringify(this.dateModel),
      },
    };
    // this.router.navigate(['/booking/booking'], navigationExtras);
  }
  onPlanSelected(plan, room) {

    this.booking.netAmount = plan.amount * this.DiffDate * this.noOfrooms;
    console.log('plan ',JSON.stringify(this.DiffDate));

    if (this.property.taxDetails.length > 0) {
      this.taxPercentage = this.property.taxDetails[0].percentage;
    }
    if (this.property.taxDetails[0].taxSlabsList.length > 0) {
      this.property.taxDetails[0].taxSlabsList.forEach((element) => {
        if (
          element.maxAmount > this.booking.netAmount &&
          element.minAmount < this.booking.netAmount
        ) {
          this.taxPercentage = element.percentage;
        } else if (element.maxAmount < this.booking.netAmount) {
          this.taxPercentage = element.percentage;
        }
      });
    }
    this.booking.taxPercentage = this.taxPercentage;
    this.planDetails = plan;
    this.booking.planCode = plan.code;
    this.booking.roomRatePlanName = plan.name;
    this.booking.roomPrice = plan.amount;
    this.planSelected = true;
    this.planAmount = plan.amount;

    if (this.booking.noOfPersons > room.maximumOccupancy) {
      this.extraPersonRate = room.extraChargePerPerson;
    }
    this.booking.extraPersonCharge = this.extraPersonRate;
    // this.fromDate = undefined;
    // this.toDate = undefined;
    // this.booking.fromDate = undefined;
    // this.booking.toDate = undefined;
    console.log(JSON.stringify(this.booking));
    console.log(JSON.stringify(this.checkAvailabilityStatusHide));
    this.changeDetectorRefs.detectChanges();
// this.checkingAvailability();
  }
  bookRoomNow() {
    this.booking.noOfRooms = this.noOfrooms;
    this.booking.noOfPersons = this.adults;
    this.booking.noOfExtraPerson = this.children;

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

        this.booking.netAmount = this.booking.roomPrice * this.booking.noOfRooms * this.DiffDate;
        this.booking.discountAmount = 0;
        // this.booking.totalAmount = this.booking.netAmount + ((this.booking.netAmount * this.taxPercentage) / 100) - this.booking.discountAmount;
        this.booking.gstAmount = (this.booking.netAmount * this.booking.taxPercentage) / 100;
        this.booking.totalAmount = this.booking.netAmount + this.booking.gstAmount - this.booking.discountAmount;
        console.log('book now ',JSON.stringify(this.booking.netAmount));
    this.token.saveBookingData(this.booking);
    this.router.navigate(["/booking/booking"]);
  }
  getAvailableRoom() {
    this.apiService.checkAvailabilityByID(this.booking).subscribe(
      (response) => {
        this.property = response.body;
        this.token.saveProperty(this.property );
        this.rooms = response.body.roomList;
        this.checkAvailabilityStatus = response.body.available;
        this.booking.bookingAmount = response.body.bookingAmount;
        this.booking.extraPersonCharge = response.body.extraPersonCharge;
        // this.selectedRoomMaximumOccupancy = response.body.noOfPersons;

        if (response.body.available == true) {
          this.checkAvailabilityStatusName = "Available";
        } else {
          this.checkAvailabilityStatusName = "Not Available";
        }

        console.log("checkAvailability " + JSON.stringify(response.body));
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
          "response room choose room " + JSON.stringify(response.body)
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
    var yearAndMonth = dateString.split("-", 3);
    this.daySelected = String(yearAndMonth[2].split(" ", 1));
    this.yearSelected = yearAndMonth[0];
    this.monthSelected = parseInt(yearAndMonth[1]) - 1;
  }

  getCheckOutDateFormat(dateString: string) {
    var yearAndMonth = dateString.split("-", 3);
    this.daySelected2 = String(yearAndMonth[2].split(" ", 1));
    this.yearSelected2 = yearAndMonth[0];
    this.monthSelected2 = parseInt(yearAndMonth[1]) - 1;
  }
}
