import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms.component';
import { RoomsRoutes } from './rooms.routing';


@NgModule({


  imports: [
    CommonModule,
    RoomsRoutes
  ],
  declarations: [RoomsComponent,
  ]
})
export class RoomsModule { }
