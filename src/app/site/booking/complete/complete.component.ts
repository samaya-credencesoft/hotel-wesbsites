import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/room/room';
import { PROPERTY_ID, ApiService } from 'src/app/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { DateModel } from './../../home/model/dateModel';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Booking } from '../../../booking/booking';
import { FormControl, FormGroup, NgForm, FormGroupDirective, Validators,FormBuilder } from '@angular/forms';
import { Payment } from './../../../payment/payment';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {

  rooms: Room[];
  room: Room;
  payment : Payment;
  dateModel : DateModel;
  booking : Booking;

  daySelected : string;
  yearSelected : string;
  monthSelected : number;

  daySelected2 : string;
  yearSelected2 : string;
  monthSelected2 : number;


  currentDay : string;

  monthArray =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  constructor(private apiService: ApiService,
    private router : Router,
    private formBuilder: FormBuilder,
    private acRoute : ActivatedRoute,)
  {
    this.dateModel = new DateModel();
    this.booking = new Booking();
    this.room = new Room();
    this.payment = new Payment();
  }

 ngOnInit()
 {
  this.acRoute.queryParams.subscribe(params => {

    if(params["dateob"] != undefined)
    {
        this.dateModel = JSON.parse(params["dateob"]);

        this.room = this.dateModel.room;
        this.booking = this.dateModel.booking;
        this.payment = this.dateModel.payment;

        this.getCheckInDateFormat(this.dateModel.checkedin);
        this.getCheckOutDateFormat(this.dateModel.checkout);
    }

  });
 }

 getCheckInDateFormat(dateString:string)
 {
   var yearAndMonth = dateString.split("-", 3);
   this.daySelected = String(yearAndMonth[2].split(" ", 1));
   this.yearSelected = yearAndMonth[0];
   this.monthSelected = parseInt(yearAndMonth[1])-1;
 }

 getCheckOutDateFormat(dateString:string)
 {
   var yearAndMonth = dateString.split("-", 3);
   this.daySelected2 = String(yearAndMonth[2].split(" ", 1));
   this.yearSelected2 = yearAndMonth[0];
   this.monthSelected2 = parseInt(yearAndMonth[1])-1;
 }


}
