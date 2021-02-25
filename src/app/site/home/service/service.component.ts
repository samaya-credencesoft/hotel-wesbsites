import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  galleryImage = [
    {
      title: '1',
      image: 'assets/images/slides/gallery-1.jpg',
    },
    {
      title: '2',
      image: 'assets/images/slides/gallery-2.jpg',
    },
    {
      title: '3',
      image: 'assets/images/slides/gallery-3.jpg',
    },
    {
      title: '4',
      image: 'assets/images/slides/gallery-4.jpg',
    },
    {
      title: '5',
      image: 'assets/images/slides/gallery-5.jpg',
    },
    {
      title: '6',
      image: 'assets/images/slides/gallery-6.jpg',
    },
    {
      title: '7',
      image: 'assets/images/slides/gallery-7.jpg',
    },
  ];
  slideConfig =
  {
     centerMode: true,
     centerPadding: '20%',
     slidesToShow: 1,
     autoplay: true,
     autoplaySpeed: 2000,
     arrows: true,
     responsive: [
        {
          breakpoint: 1367,
          settings: {
            centerPadding: '15%'
          }
        },
        {
          breakpoint: 1025,
          settings: {
            centerPadding: '5%',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 767,
          settings: {
            centerPadding: '0',
            slidesToShow: 1
          }
        }
     ]
  };
  constructor() { }

  ngOnInit() {
  }

}
