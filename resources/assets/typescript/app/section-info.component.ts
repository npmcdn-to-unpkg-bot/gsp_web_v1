import { Component, Input } from '@angular/core';
import { MapSection } from './map-section';
import { NameForPtypeIdPipe } from './name-for-p-type-id.pipe'; // import pipe here

@Component({
  selector: 'section-info',
  templateUrl: './app/templates/section-info.component.html',
  pipes : [ NameForPtypeIdPipe ]
})

export class SectionInfoComponent { 
  @Input() model: MapSection;
  @Input() hoursHtml: string = 'None';
}