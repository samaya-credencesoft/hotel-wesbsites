import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { ApiService, PROPERTY_ID } from "src/app/api.service";
import { BankAccount } from "src/app/model/BankAccount";
import { Booking } from "src/app/model/booking";
import { DateModel } from "src/app/model/dateModel";
import { MobileWallet } from "src/app/model/mobileWallet";
import { Room } from "src/app/model/room";
import { RoomRatePlans } from "src/app/model/roomRatePlans";
import { BusinessUser } from "src/app/model/user";
import { TokenStorage } from "src/app/token.storage";


@Component({
  selector: "app-choose-room",
  templateUrl: "./choose-room.component.html",
  styleUrls: ["./choose-room.component.css"],
})
export class ChooseRoomComponent implements OnInit {
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

  businessUser: BusinessUser;

  taxPercentage: number = 0;

  adults: number = 1;
  children: number = 0;
  noOfrooms: number = 1;
  DiffDate;
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
        this.booking.noOfRooms = this.dateModel.booking.noOfRooms;
        this.booking.noOfPersons = this.dateModel.booking.noOfPersons;

        this.getAvailableRoom();
      }
    });
  }

  ngOnInit() {
    //this.checkincheckoutDate();
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
    // this.checkAvailabilityStatus = false;
    // this.checkAvailabilityStatusHide = true;
    // this.checkAvailabilityStatusName = undefined;
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
    this.booking.netAmount = plan.amount * this.DiffDate * this.noOfrooms;
    if (this.businessUser.taxDetails.length > 0) {
      this.taxPercentage = this.businessUser.taxDetails[0].percentage;
    }
    if (this.businessUser.taxDetails[0].taxSlabsList.length > 0) {
      this.businessUser.taxDetails[0].taxSlabsList.forEach((element) => {
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

    this.mobileWallet = this.businessUser.mobileWallet;
        this.bankAccount = this.businessUser.bankAccount;
        //  Logger.log(' this.businessUser ===='+JSON.stringify( this.businessUser));
        if (this.businessUser.taxDetails.length > 0) {
          this.taxPercentage = this.businessUser.taxDetails[0].percentage;
        }
        if (this.businessUser.taxDetails[0].taxSlabsList.length > 0) {
          this.businessUser.taxDetails[0].taxSlabsList.forEach((element) => {
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

        this.booking.totalAmount = this.booking.netAmount + ((this.booking.netAmount * this.taxPercentage) / 100) - this.booking.discountAmount;
        this.booking.discountAmount = 0;
        this.booking.netAmount = this.booking.roomPrice * this.booking.noOfRooms * this.DiffDate;
        this.booking.gstAmount = (this.booking.netAmount * this.booking.taxPercentage) / 100;
        this.booking.totalAmount = this.booking.netAmount + this.booking.gstAmount - this.booking.discountAmount;


    this.token.saveBookingData(this.booking);
    this.router.navigate(["/booking/booking"]);
  }
  getAvailableRoom() {
    this.apiService.checkAvailabilityByID(this.booking).subscribe(
      (response) => {
        this.businessUser = response.body;
        this.token.saveBusinessUser(this.businessUser );
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
