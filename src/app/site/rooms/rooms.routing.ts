import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: RoomsComponent},
  { path: 'rooms/details/:id', component: DetailsComponent},
];

export const RoomsRoutes = RouterModule.forChild(routes);
