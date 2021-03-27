import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BookingModule } from './booking/booking.module';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  { path: '', redirectTo: 'booking', pathMatch:'full'},

  // { path: 'rooms', loadChildren: './rooms/rooms.module#RoomsModule'},
  // { path: 'rooms', component: RoomsComponent},

  // { path: 'book', component: BookComponent},
  // { path: 'gallery', component: GalleryComponent},
  // { path: 'about', component: AboutComponent},
  // { path: 'policy', component: PolicyComponent},

  // { path: 'booking', loadChildren: './booking/booking.component#BookingModule'},
  { path: 'booking', component: BookingComponent},

  // { path: 'contact', component: ContactComponent},

];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BookingModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ]
})
export class SiteModule { }
