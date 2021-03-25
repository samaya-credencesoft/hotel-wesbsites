import { TokenStorage } from 'src/app/token.storage';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room } from './room';
import { Property } from '../site/home/model/property';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit {
  @Input() room: Room;
  @Input() property: Property;
  @Output() checkAvailabilityEmit = new EventEmitter<boolean>();
  @Output() roomSelectionEmit = new EventEmitter<Room>();
  constructor(
public token: TokenStorage
  ) { }
  ngOnInit() { }
  checkAvailability() {
      this.checkAvailabilityEmit.emit(true);
      this.roomSelectionEmit.emit(this.room);
     }
}
