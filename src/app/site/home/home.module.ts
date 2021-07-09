import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { GetintouchComponent } from './getintouch/getintouch.component';
import { SliderComponent } from './slider/slider.component';
import { BlogComponent } from './blog/blog.component';
import { ServiceComponent } from './service/service.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RoomComponent } from './room/room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
  { path: '', component: HomeComponent},

];
@NgModule({
  declarations: [
    HomeComponent,
    GetintouchComponent,
    SliderComponent,
    BlogComponent,
    ServiceComponent,
    AboutusComponent,
    RoomComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SlickCarouselModule,
    NgbModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: environment.googleKey // 'AIzaSyAYT8pe61MUbk27eiYi9LnnPhwo031Ye7w'
    })
  ],
  exports: [
    RoomComponent
  ]
})
export class HomeModule { }
