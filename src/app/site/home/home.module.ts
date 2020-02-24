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
    RouterModule.forRoot(routes)
  ],
  exports: [
    RoomComponent
  ]
})
export class HomeModule { }
