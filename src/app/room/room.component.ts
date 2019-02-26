import { Component, OnInit, Input } from '@angular/core';
import { Room } from './room';
import { Property } from './../property/property';
import { MatDialog } from '@angular/material';
import { BookingComponent } from '../booking/booking.component';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit {
  @Input() room: Room;
  @Input() property: Property;
  constructor(
    private dialog: MatDialog
  ) { }
  ngOnInit() { }
  createBookingDialog() {
    const dialogRef = this.dialog.open(BookingComponent, {
      width: '600px',
      data: {
        fromDate: '',
        toDate: '',
        roomId: this.room.id,
        propertyId: this.property.id,
        email: this.property.email,
        businessName: this.property.name,
        managerContactNo: this.property.managerContactNo
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
