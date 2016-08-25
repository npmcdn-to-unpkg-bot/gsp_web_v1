import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './components/main-map';

const appRoutes: Routes = [
  {
    path: 'map',
    component: MapComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);