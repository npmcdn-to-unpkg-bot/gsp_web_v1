import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { MapComponent }  from './map.component';
import { LeftMapLegendComponent } from './left-map-legend.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [
    AppComponent,
    MapComponent,
    LeftMapLegendComponent
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }