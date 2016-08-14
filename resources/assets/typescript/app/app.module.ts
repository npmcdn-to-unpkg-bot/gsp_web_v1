import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { MapComponent }  from './map.component';
import { LeftMapLegendComponent } from './left-map-legend.component';
import { ModalContainerComponent } from './modal-container.component';
import { SectionUpdateFormComponent } from './section-update-form.component';
import { SectionInfoComponent } from './section-info.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations: [
    AppComponent,
    MapComponent,
    LeftMapLegendComponent,
    ModalContainerComponent,
    SectionUpdateFormComponent,
    SectionInfoComponent
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }