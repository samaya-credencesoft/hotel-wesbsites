import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({

  declarations: [HeaderComponent, FooterComponent, LayoutComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    NgbModule
  ]
})
export class LayoutModule { }
