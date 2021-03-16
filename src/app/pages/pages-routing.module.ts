import { NgModule } from '@angular/core';

import { AboutComponent } from './about/about.component';

import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '',  redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "all-rooms", component: AllRoomsComponent },
  { path: "gallery", component: GalleryComponent },
  { path: "services", component: ServicesComponent },
  { path: "aboutus", component: AboutusComponent },
  { path: "contact", component: ContactComponent },

];

@NgModule({
  imports: [


  RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
