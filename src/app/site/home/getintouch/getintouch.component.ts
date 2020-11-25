import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getintouch',
  templateUrl: './getintouch.component.html',
  styleUrls: ['./getintouch.component.css']
})
export class GetintouchComponent implements OnInit {

  lat : any = 40.80;
   lng : any = -73.70;

   mapScrollWheel : boolean = false;

   markers : any = [
                     {
                        lat:  40.94401669296697,
                        lng:  -74.16938781738281,
                        icon: 'assets/images/rest.png',
                        title    : 'Tom Restaurant',
                        address  : '964 School Street, New York',
                        image    : 'assets/images/most-img-1.jpg'
                     },

                  ];
  constructor() { }

  ngOnInit() {
  }

}
