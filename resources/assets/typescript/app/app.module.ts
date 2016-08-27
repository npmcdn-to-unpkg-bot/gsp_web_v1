import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { MapComponent }  from './components/main-map';
import { LeftMapLegendComponent } from './components/left-map-legend';
import { ModalContainerComponent } from './components/modal-container';
import { SectionUpdateFormComponent } from './components/section-update-form';
import { PointUpdateFormComponent } from './components/point-update-form';
import { SectionInfoComponent } from './components/section-info';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations: [
    AppComponent,
    MapComponent,
    LeftMapLegendComponent,
    ModalContainerComponent,
    SectionUpdateFormComponent,
    PointUpdateFormComponent,
    SectionInfoComponent
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }