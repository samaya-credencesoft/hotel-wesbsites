import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PaymentComponent } from './payment/payment.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking/booking.component';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { AppMaterialModules } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookComponent } from './book/book.component';
import { PropertyComponent } from './property/property.component';
import { RoomComponent } from './room/room.component';
import { GuestComponent } from './guest/guest.component';
import { HTTPStatus } from './../app/app.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './app.interceptor';
import { PolicyComponent } from './policy/policy.component';
import { BookingdetailComponent } from './bookingdetail/bookingdetail.component';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from './shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SiteModule } from './site/site.module';
import { LayoutModule } from './shared/layout/layout.module';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
import { DetailsComponent } from './site/rooms/details/details.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TokenStorage } from '../../src/app/token.storage';
import { AboutComponent } from './site/about/about.component';
const routes: Routes = [
  { path: '', component: SiteModule},

];
@NgModule({
  declarations: [
    AppComponent,
    AmenitiesComponent,
    GalleryComponent,
    PaymentComponent,
    ContactComponent,
    BookingComponent,
    BookComponent,
    PropertyComponent,
    RoomComponent,
    GuestComponent,
    PolicyComponent,
    BookingdetailComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DetailsComponent,
    BookingComponent,
    AboutComponent
  ],
  entryComponents: [BookingComponent],
  imports: [
    SharedModule,
    LayoutModule,
    SiteModule,
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    MatRadioModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule,
    BrowserAnimationsModule,
    CommonModule,
    MatCheckboxModule,
    AppMaterialModules,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAYT8pe61MUbk27eiYi9LnnPhwo031Ye7w'
    })
  ],
  exports:[

  ],
  providers: [
    ApiService,
    TokenStorage,
    HTTPStatus,
    TokenStorage,
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
