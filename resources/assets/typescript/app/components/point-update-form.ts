import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MapPoint } from '../models/map-point';
import { MapSection } from '../models/map-section';
import { SectionHours } from '../models/section-hours';
import { AppSettings } from '../app-settings';
import { MapSectionService } from '../services/map-section';
// shared service with parent view for component interactions
import { FormMarkers } from '../services/form-markers';

//import { NameForPtypeIdPipe } from './name-for-p-type-id.pipe'; // import pipe here

@Component({
  selector: 'point-update-form',
  templateUrl:  AppSettings.APP_RELATIVE_URL + '/app/templates/point-update-form.html',
  // TODO:NW figure out how you DO NOT 'inject' the FormMarkersService to share data
  providers: [ MapSectionService] 
  //pipes : [ NameForPtypeIdPipe ]
})

export class PointUpdateFormComponent implements OnInit { 

  constructor(
    private mapSectionService:MapSectionService,
    private formMarkerService:FormMarkers
  ){}

  @Input() model: MapPoint;
  @Output() onDeleteComplete = new EventEmitter();

  pTimes = [];
  pTypes = [];
  hoursTypes=[];

  //model = new MapSection(1); // set from parent on selection
  submitted = false;
  
  // don't set model.newPolyline here, onInit is called after the form model has already been set
  // @see formMarkers.showFormLink()
  // TODO:NW understand how to avoid the problem: if model for this form is set by something else
  // then when this is rendered (after the data model has been set) the ngOnInit will overwrite
  // Use constructor instead of ngOnInit? Use event queue? 
  ngOnInit(){
    let ptDef = MapSection.PARKING_TYPES;
    for(var ptId in ptDef) {
      this.pTypes.push(ptDef[ptId]);
    }

    let times = [0,5,10,15,30,60,90,120,150,180,210,240,270,300,330,360,390,420,450,480];
    for(let t of times){
      let timeString = this.labelForTime(t);
      this.pTimes.push({time:t, label:timeString});
    }
    this.hoursTypes = SectionHours.getTypes();
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

  onSubmit() { 
    this.submitted = true; 
    this.model.lat = this.formMarkerService.mark1.position.lat();
    this.model.lng = this.formMarkerService.mark1.position.lng();
    
    //this.mapSectionService.saveMapSection(this.model).then(function(response){
       // for now we don't need the new id or anything from the response
    //});
  }

  deletePoint(){
    this.submitted = true;
    let self=this;
    this.mapSectionService.deleteMapSection(this.model.id).then(function(response){
      // for now we don't need the new id or anything from the response
      let testMessage='hi'
      self.onDeleteComplete.emit(testMessage);
    });
  }

  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;

  showNewPoint() {
    this.model = new MapPoint(-1);
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

}