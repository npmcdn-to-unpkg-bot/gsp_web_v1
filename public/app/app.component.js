System.register(['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            let AppComponent = class AppComponent {
                constructor() {
                    this.title = 'Gmaps Street Parking';
                }
            };
            AppComponent = __decorate([
                core_1.Component({
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
        <left-map-legend id="left-content"></left-map-legend>
      </div>
    </div>
  `
                }), 
                __metadata('design:paramtypes', [])
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
        }
    }
});
