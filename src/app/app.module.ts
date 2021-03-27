import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiService } from "./api.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AgmCoreModule } from "@agm/core";
import { RouterModule, Routes } from "@angular/router";
import { SiteModule } from "./site/site.module";
import { FooterComponent } from "./shared/layout/footer/footer.component";
import { HeaderComponent } from "./shared/layout/header/header.component";
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from "@angular/common";
import { TokenStorage } from "../../src/app/token.storage";
import { environment } from "src/environments/environment";
import { Ng2TelInputModule } from "ng2-tel-input";
import { HTTPStatus, Interceptor } from "./app.interceptor";
import { AppMaterialModules } from "./material.module";
import { BookingComponent } from "./site/booking/booking.component";
import { SidebarComponent } from "./shared/layout/sidebar/sidebar.component";
import { SharedModule } from "./shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [{ path: "", component: SiteModule }];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    SharedModule,
    SiteModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    AppMaterialModules,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
    AgmCoreModule.forRoot({
      apiKey: environment.googleKey, // 'AIzaSyAYT8pe61MUbk27eiYi9LnnPhwo031Ye7w'
    }),
  ],
  exports: [],
  providers: [
    ApiService,
    TokenStorage,
    HTTPStatus,
    TokenStorage,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
