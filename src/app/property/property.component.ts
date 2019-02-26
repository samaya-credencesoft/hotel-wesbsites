import { Component, OnInit, Input } from '@angular/core';
import { Property } from './property';
import { MatDialog } from '@angular/material';
import { BookingComponent } from '../booking/booking.component';
@Component({
    selector: 'app-property',
    templateUrl: './property.component.html'
  })

export class PropertyComponent implements OnInit {
  @Input() property: Property;
  ngOnInit() { }
  constructor(
    private dialog: MatDialog
  ) { }
  createBookingDialog() {
    console.log(this.property.id);
    const dialogRef = this.dialog.open(BookingComponent, {
      width: '800px',
      data: {
        fromDate: '',
        toDate: '',
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