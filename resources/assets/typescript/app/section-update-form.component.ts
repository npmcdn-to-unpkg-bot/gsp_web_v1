import { Component, Input } from '@angular/core';
import { MapSection } from './map-section';
import { NameForPtypeIdPipe } from './name-for-p-type-id.pipe'; // import pipe here

@Component({
  selector: 'section-update-form',
  templateUrl: './app/section-update-form.component.html',
  pipes : [ NameForPtypeIdPipe ]
})

export class SectionUpdateFormComponent { 
   @Input() section: MapSection;

}