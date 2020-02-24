import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, FormGroupDirective, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { DateModel } from '../model/dateModel';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  currentDay : string;
  day : string;
  year : string;
  month : number;

  day2 : string;
  year2 : string;
  month2: number;

  fromDate : string;
  dateModel : DateModel;

  checkedin: FormControl = new FormControl();
  checkedout: FormControl = new FormControl();

  monthArray =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  constructor(private router : Router) { }


  ngOnInit()
  {
    this.checkincheckoutDate();
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


  getDay(date:Date)
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

  onBook()
  {
    this.dateModel = new DateModel();

    if(this.checkedin.value === null)
    {
      this.dateModel.checkedin = this.year+'-'+this.month+1+'-'+this.day;
    }
    else
    {
      this.dateModel.checkedin = this.getDateFormat(this.checkedin.value);
    }

    if(this.checkedout.value === null)
    {
      this.dateModel.checkout =  this.year2+'-'+this.month2+1+'-'+this.day2;
    }
    else
    {
      this.dateModel.checkout = this.getDateFormat(this.checkedout.value);
    }


    let navigationExtras: NavigationExtras = {
      queryParams: {
          dateob: JSON.stringify(this.dateModel),
      }
    };

    this.router.navigate(['/booking/choose'],navigationExtras );
  }

  getDateFormat(dateString:string)
  {
    var yearAndMonth = dateString.split("-", 3);
    return yearAndMonth[0]+'-'+yearAndMonth[1]+'-'+ yearAndMonth[2].split(" ", 1);
  }

  checkedInEvent()
  {
    let currentDate: Date = new Date(this.checkedin.value);

    let afterDate: Date = new Date();
    afterDate.setDate(currentDate.getDate()+1);
    afterDate.setFullYear(currentDate.getFullYear());
    afterDate.setMonth(currentDate.getMonth());

    this.day2 = this.getDay(afterDate);
    this.year2 = String(afterDate.getFullYear());
    this.month2 = afterDate.getMonth();
  }

}
