import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
export interface GuestReview {
  profilePhotoUrl: string;
  rating: number ;
  relativeTimeDescription: string ;
  reviewText: string ;
  reviewerName: string ;
}
@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(private apiServices: ApiService) { }
  guestreviews: GuestReview[] ;



  ngOnInit() {
    this.apiServices.getGoogleReviews().subscribe( response => {
     this.guestreviews = response.body ;

     });
  }

}
