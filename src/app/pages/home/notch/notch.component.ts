import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notch',
  templateUrl: './notch.component.html',
  styleUrls: ['./notch.component.css']
})
export class NotchComponent implements OnInit {
  galleryItems = [
    {
      imageUrl: 'assets/images/service_img1.jpg',
      title: 'Rooms'
    },
    {
      imageUrl: 'assets/images/service_img2.jpg',
      title: 'Lobby'
    },
    {
      imageUrl: 'assets/images/service_img3.jpg',
      title: 'Lobby'
    },
    {
      imageUrl: 'assets/images/service_img4.jpg',
      title: 'Services'
    },
    {
      imageUrl: 'assets/images/service_img5.jpg',
      title: 'Party halls'
    },
    {
      imageUrl: 'assets/images/service_img6.jpg',
      title: 'Party halls'
    },
    {
      imageUrl: 'assets/images/service_img7.jpg',
      title: 'Corrider'
    },
    {
      imageUrl: 'assets/images/service_img8.jpg',
      title: 'Rooms'
    }

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
