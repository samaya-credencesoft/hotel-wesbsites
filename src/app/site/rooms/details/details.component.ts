import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, PROPERTY_ID } from 'src/app/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Room } from 'src/app/room/room';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: number;
  rooms: Room[];
  room: Room;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService) {
    this.id = this.route.snapshot.params.id;
    this.route.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number
      console.log('list detail page: ' + this.id);

      // console.log('list detail page: ' + JSON.stringify(this.room));
    });
  }

  ngOnInit() {
    this.getRoom();
    this.setRoom('this.id');
  }

  getRoom() {
    this.apiService.getRoomDetailsByPropertyId(PROPERTY_ID).subscribe(response => {
      this.rooms = response.body;
      // console.log('list detail page: ' + JSON.stringify( this.rooms));
    },
      error => {
        if (error instanceof HttpErrorResponse) {

        }
      }
  );
  }

  setRoom(id: string) {
    this.room = this.rooms.find(room =>
      room.id === id
    );
}
}
