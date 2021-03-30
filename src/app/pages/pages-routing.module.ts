import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { BookingModule } from '../site/booking/booking.module';

const routes: Routes = [
  // { path: '',  redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: "all-rooms", component: AllRoomsComponent },
  { path: "gallery", component: GalleryComponent },
  { path: "services", component: ServicesComponent },
  { path: "aboutus", component: AboutusComponent },
  { path: "contact", component: ContactComponent },

  // { path: 'booking', component: BookingModule }
];

@NgModule({
  imports: [


  RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
