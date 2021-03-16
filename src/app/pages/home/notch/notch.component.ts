import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notch',
  templateUrl: './notch.component.html',
  styleUrls: ['./notch.component.css']
})
export class NotchComponent implements OnInit {
  galleryItems=[
{
imageUrl:'assets/images/service_img1.jpg',
title:'Top-Notch'
},
{
  imageUrl:'assets/images/service_img2.jpg',
  title:'Top-Notch'
  },
  {
    imageUrl:'assets/images/service_img3.jpg',
    title:'Top-Notch'
    },
    {
      imageUrl:'assets/images/service_img4.jpg',
      title:'Top-Notch air'
      },
      {
        imageUrl:'assets/images/service_img5.jpg',
        title:'Top-Notch air'
        },
        {
          imageUrl:'assets/images/service_img6.jpg',
          title:'Lets Talk'
          },
          {
            imageUrl:'assets/images/service_img7.jpg',
            title:'Lets Talk'
            },
            {
              imageUrl:'assets/images/service_img8.jpg',
              title:'Lets Talk'
              }

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
