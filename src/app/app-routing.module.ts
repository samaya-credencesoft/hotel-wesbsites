import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './shared/page/page.component';


const routes: Routes = [
  { path: '', component: PageComponent,
  children: [{
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./site/booking/booking.module').then(m => m.BookingModule)
  }]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],


  exports: [RouterModule]
})
export class AppRoutingModule { }
