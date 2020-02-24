import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule
  ],
  exports: [
    CommonModule,

    RouterModule
  ]
})
export class SharedModule { }
