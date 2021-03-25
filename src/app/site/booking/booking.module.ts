import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { ChooseRoomComponent } from './choose-room/choose-room.component';
import { CompleteComponent } from './complete/complete.component';
import {MatSelectModule} from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
  { path: '', component: BookingComponent},
  { path: 'booking/choose', component: ChooseRoomComponent},
  { path: 'booking/booking', component: NewBookingComponent},
  { path: 'booking/payment', component: CheckoutComponent},
  { path: 'booking/complete', component: CompleteComponent},
  { path: 'booking/details/:id/:email', component: BookingDetailsComponent}
];
@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgbModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  declarations: [BookingComponent, CheckoutComponent, NewBookingComponent, ChooseRoomComponent, CompleteComponent, BookingDetailsComponent]
})
export class BookingModule { }