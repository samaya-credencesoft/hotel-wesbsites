import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { Property } from 'src/app/shared/models/property';
import { TokenStorage } from 'src/app/token.storage';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  galleryImage = [
    {
      imageURL: 'assets/images/gallery_img1.jpg',
      title: 'Room',
      class: 'hotel'
    },
    {
      imageURL: 'assets/images/gallery_img2.jpg',
      title: 'Room'
    },
    {
      imageURL: 'assets/images/gallery_img3.jpg',
      title: 'Room'
    },
    {
      imageURL: 'assets/images/gallery_img4.jpg',
      title: 'Hotel'
    },
    {
      imageURL: 'assets/images/gallery_img5.jpg',
      title: 'Room'
    },
    {
      imageURL: 'assets/images/gallery_img6.jpg',
      title: 'Room'
    },
    {
      imageURL: 'assets/images/gallery_img7.jpg',
      title: 'Room'
    },
    {
      imageURL: 'assets/images/gallery_img8.jpg',
      title: 'Room'
    },
    {
      imageURL: 'assets/images/gallery_img9.jpg',
      title: 'Room'
    },
    {
      imageURL: 'assets/images/gallery_img10.jpg',
      title: 'Room'
    },
    {
      imageURL: 'assets/images/gallery_img11.jpg',
      title: 'Room'
    },
    {
      imageURL: 'assets/images/gallery_img12.jpg',
      title: 'Room'
    },
    {
      imageURL: 'assets/images/gallery_img13.jpg',
      title: 'Hall'
    },

    {
      imageURL: 'assets/images/gallery_img14.jpg',
      title: 'Hall'
    },
    {
      imageURL: 'assets/images/gallery_img15.jpg',
      title: 'Hall'
    }, {
      imageURL: 'assets/images/gallery_img16.jpg',
      title: 'Hall'
    },
    {
      imageURL: 'assets/images/gallery_img17.jpg',
      title: 'Hall'
    },
    {
      imageURL: 'assets/images/gallery_img18.jpg',
      title: 'Hall'
    },
    {
      imageURL: 'assets/images/gallery_img19.jpg',
      title: 'Hall'
    },
    {
      imageURL: 'assets/images/gallery_img20.jpg',
      title: 'Hall'
    },
    {
      imageURL: 'assets/images/gallery_img21.jpg',
      title: 'Hall'
    },
    {
      imageURL: 'assets/images/gallery_img22.jpg',
      title: 'Hall'
    },
    {
      imageURL: 'assets/images/gallery_img23.jpg',
      title: 'Corrider'
    },
    {
      imageURL: 'assets/images/gallery_img24.jpg',
      title: 'Hall'
    },
    {
      imageURL: 'assets/images/gallery_img25.jpg',
      title: 'Lobby'
    },
    {
      imageURL: 'assets/images/gallery_img26.jpg',
      title: 'Lobby'
    },
    {
      imageURL: 'assets/images/gallery_img27.jpg',
      title: 'Hotel'
    },
    {
      imageURL: 'assets/images/gallery_img28.jpg',
      title: 'Hotel'
    },
    {
      imageURL: 'assets/images/gallery_img29.jpg',
      title: 'Hotel'
    },
    {
      imageURL: 'assets/images/gallery_img30.jpg',
      title: 'Reception'
    },
    // {
    //   imageURL: 'assets/images/gallery_img31.jpg',
    //   title: 'Hotel'
    // },
    {
      imageURL: 'assets/images/gallery_img32.jpg',
      title: 'Hotel'
    },
    {
      imageURL: 'assets/images/gallery_img33.jpg',
      title: 'Lobby'
     }
    // {
    //   imageURL: 'assets/images/gallery_img34.jpg',
    //   title: 'Hotel'
    // }

  ]
  property: Property;
  constructor(
    private router: Router,
    private token: TokenStorage,
    private apiService: ApiService
  ) {
    this.property = new Property();
    if (this.token.getProperty() !== null) {
      this.property = this.token.getProperty();
    } else {
      this.getProperty();
    }
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
// getGallery(){}


}
