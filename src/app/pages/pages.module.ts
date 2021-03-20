import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SliderComponent } from './home/slider/slider.component';
import { RoomsComponent } from './home/rooms/rooms.component';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { ServicesComponent } from './services/services.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NotchComponent } from './home/notch/notch.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeAboutComponent } from './home/home-about/home-about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent,
    RoomsComponent,
    AllRoomsComponent,
    ServicesComponent,
    GalleryComponent,
    NotchComponent,
    AboutusComponent,
    ContactComponent,
    HomeAboutComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule
  ],
exports:[

]
})
export class PagesModule { }
