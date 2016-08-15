import { Component, Input, OnInit } from '@angular/core';
import { MapSection } from './map-section';
import { AppSettings } from './app-settings';

//import { NameForPtypeIdPipe } from './name-for-p-type-id.pipe'; // import pipe here

@Component({
  selector: 'section-update-form',
  templateUrl: './app/templates/section-update-form.component.html'
  //pipes : [ NameForPtypeIdPipe ]
})

export class SectionUpdateFormComponent implements OnInit { 
  @Input() model: MapSection;

  pTimes = [];
  pTypes = [];
  

  //model = new MapSection(1); // set from parent on selection
  submitted = false;
  newPolyline = false;
  
  ngOnInit(){
    let ptDef = AppSettings.PARKING_TYPES;
    for(var ptId in ptDef) {
      this.pTypes.push(ptDef[ptId]);
    }

    let times = [0,5,10,15,30,60,90,120,150,180,210,240,270,300,330,360,390,420,450,480];
    for(let t of times){
      let timeString = this.labelForTime(t);
      this.pTimes.push({time:t, label:timeString});
    }
  }

  labelForTime(t: number):string{
    if(t == 0){
      return '';
    } else if(t==5){
      return '5 min';
    } else if(t==10){
      return '10 min';
    } else if(t==15){
      return '15 min';
    } else if(t==30){
      return '30 min';
    } else {
      return t/60 + ' hrs';
    }
  }

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