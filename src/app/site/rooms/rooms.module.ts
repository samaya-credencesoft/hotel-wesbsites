import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms.component';
import { RoomsRoutes } from './rooms.routing';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({


  imports: [
    CommonModule,
    SlickCarouselModule,
    RoomsRoutes
  ],
  declarations: [
    RoomsComponent,
  ]
})
export class RoomsModule { }
