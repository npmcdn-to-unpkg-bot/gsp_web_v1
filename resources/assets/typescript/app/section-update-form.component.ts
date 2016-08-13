import { Component, Input } from '@angular/core';
import { MapSection } from './map-section';

@Component({
  selector: 'section-update-form',
  templateUrl: './app/section-update-form.component.html'
})

export class SectionUpdateFormComponent { 
   @Input() section: MapSection;

}