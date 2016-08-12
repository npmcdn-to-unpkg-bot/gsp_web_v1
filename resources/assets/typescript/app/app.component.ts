import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <my-map></my-map>
    <a routerLink="/map">Map</a>
    <router-outlet></router-outlet>
  `
})

export class AppComponent {
  title = 'Gmaps Street Parking';
}