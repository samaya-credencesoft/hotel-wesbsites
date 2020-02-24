import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { ChooseRoomComponent } from './choose-room/choose-room.component';
import { CompleteComponent } from './complete/complete.component';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';

import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
const routes: Routes = [
  { path: '', component: BookingComponent},
  { path: 'booking/choose', component: ChooseRoomComponent},
  { path: 'booking/booking', component: NewBookingComponent},
  { path: 'booking/payment', component: CheckoutComponent},
  { path: 'booking/complete', component: CompleteComponent},
  { path: 'booking/detals', component: BookingDetailsComponent}
];
@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatProgressBarModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [BookingComponent, CheckoutComponent, NewBookingComponent, ChooseRoomComponent, CompleteComponent, BookingDetailsComponent]
})
export class BookingModule { }
