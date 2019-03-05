import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Property } from './../property/property';
import { Room } from './../room/room';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() rooms: Room[] ;
  @Input() property: Property;
  checkAvailability = false ;
  selectedRoom: Room ;
  ngOnInit() {
  }

  constructor(
    private apiService: ApiService
  ) {
  }
  getCheckAvailability(checkAvailability: boolean) {
    this.checkAvailability = true;
  }
  getSelectedRoom(room: Room) {
    this.selectedRoom = room;
  }
  getSelectedProperty() {
     this.selectedRoom = new Room();
     this.selectedRoom.name = 'Whole House' ;
  }
  getCheckPropertyAvailability(checkAvailability: boolean) {
    this.checkAvailability = true;
    this.selectedRoom = new Room();
    this.selectedRoom.name = 'Whole House' ;
  }
}
