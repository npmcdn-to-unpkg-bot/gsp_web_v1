import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map.component';

const appRoutes: Routes = [
  {
    path: 'map',
    component: MapComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);