import { Component, Input } from '@angular/core';
import { MapSection } from './map-section';
import { NameForPtypeIdPipe } from './name-for-p-type-id.pipe'; // import pipe here

@Component({
  selector: 'section-update-form',
  templateUrl: './app/templates/section-update-form.component.html',
  pipes : [ NameForPtypeIdPipe ]
})

export class SectionUpdateFormComponent { 
  @Input() model: MapSection;

  ptIds = [1,2,3,4];
  times = [5,10,15,,30,60,90,120,150,180,210,240,270,300,330,360,390,420,450,480];

  //model = new MapSection(1); // set from parent on selection
  submitted = false;
  
  onSubmit() { this.submitted = true; }

   // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;

  newSection() {
    this.model = new MapSection(-1);
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

}