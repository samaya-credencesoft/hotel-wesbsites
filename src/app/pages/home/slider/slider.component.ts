import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { Property } from 'src/app/shared/models/property';
import { TokenStorage } from 'src/app/token.storage';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class SliderComponent implements OnInit {
  property: Property;
  slideImage= [

    {
      imageUrl: 'assets/images/banner_bg3.jpg',
      title:'',
    },
    {
      imageUrl: 'assets/images/banner_bg1.jpg',
      title:'',
    },
    {
      imageUrl: 'assets/images/404_bg.jpg',
      title:'',
    }
  ];
  slideConfig =
  {
     centerMode: true,
     centerPadding: '0',
     slidesToShow: 1,
     autoplay: true,
     autoplaySpeed: 2000,
     arrows: false,
     responsive: [
        {
          breakpoint: 1367,
          settings: {
            centerPadding: '0'
          }
        },
        {
          breakpoint: 1025,
          settings: {
            centerPadding: '0',
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

  constructor(config: NgbCarouselConfig,
    public router: Router,
   public token: TokenStorage,
    public apiService: ApiService) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
  }
  getProperty() {
    this.apiService.getPropertyDetailsByPropertyId(PROPERTY_ID).subscribe(response => {

      this.property = response.body;
      this.token.saveProperty(this.property);
    },
      error => {
        if (error instanceof HttpErrorResponse) {

        }
      }
    );
  }

}
