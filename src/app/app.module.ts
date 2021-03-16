import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbCarousel, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PageComponent } from './shared/page/page.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { PagesModule } from './pages/pages.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TokenStorage } from './token.storage';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    PagesModule,
    ReactiveFormsModule
  ],
  providers: [
    TokenStorage,
    { provide: LocationStrategy, useClass: HashLocationStrategy },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
