import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <div id="header">
        <h1 class="title">{{title}}</h1>
        <div>
          <a routerLink="/map">Map</a> | 
          <a routerLink="/legend">Full Legend</a> | 
          <a href="/login">Login</a>
          <router-outlet></router-outlet>
        </div>
      </div>
      <div id="main-content">
        <my-map id="right-content"></my-map>
        <div id="left-content">
          
        </div>
      </div>
    </div>
  `
})

export class AppComponent {
  title = 'Gmaps Street Parking';
}