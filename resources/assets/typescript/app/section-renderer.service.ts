import { Injectable } from '@angular/core';
import { MapSection } from './map-section';

declare var google: any; // TODO:NW get types?? typings install google.maps --global

@Injectable()
export class SectionRendererService {

  // TODO:NW figure out how to inject google map object
  // constructor(private map: any) { }
  private map:any;

  init(map: any) { this.map = map; }

  renderSectionsForView(sectionsArray:MapSection[]){
    for (var i=0; i < sectionsArray.length; i++) {
      var sectionPoints = google.maps.geometry.encoding.decodePath(sectionsArray[i].polyline);
      this.drawSection(sectionPoints, sectionsArray[i].street_side, this.getTypeColor(sectionsArray[i]));
      //don't show info for things with no hours or notes
      /*
      if(
          sectionsArray[i].is_hours_restricted == 1
          || 
          (
            sectionsArray[i].notes != undefined &&
            sectionsArray[i].notes != null &&
            sectionsArray[i].notes != ""
          )
        ){
        //this.drawSectionInfoMarker(sectionsArray[i]);
      }
      */
      //alert(sectionsArray[i].id);
    }
  }

  private drawSection(sectionPoints:string, streetSide:number, color:string){
    let formPoly:any; 
    let svgPath:string = "";
    if(streetSide != 0){
        if(streetSide > 0)
            svgPath = 'M 2 0 L 3 0 L 3 1 L 2 1 2 0'; //pts are y x
        else
            svgPath = 'M -1 0 L -2 0 L -2 1 L -1 1 -1 0';
        /*
        if(streetSide > 0)
            svgPath = 'M 0 0 L -4 -2 L 0 -4 0 0'; neg wrong, switch
        else
            svgPath = 'M 0 0 L 4 2 L 0 4 0 0';
        if(streetSide > 0)
            svgPath = 'M -2 0 L -2 4 L -5 4 L -5 0 -2 0'; //pts are y x
        else
            svgPath = 'M 2 0 L 2 4 L 5 4 L 5 0 2 0';
        if(streetSide > 0)
            svgPath = 'M 1 0 L 1 2 L 0 2 L 0 0 1 0'; //pts are y x
        else
            svgPath = 'M -1 0 L -1 2 L 0 2 L 0 0 -1 0';
        if(streetSide > 0)
            svgPath = 'M 0 0 L 2 0 L 2 6 L 0 6 0 0'; //pts are y x
        else
            svgPath = 'M 0 6 L 0 12 L -2 12 L -2 6 0 6';
        if(streetSide > 0)
            svgPath = 'M 1 0 L 3 2 L 1 4 1 0'; //pts are y x
        else
            svgPath = 'M -1 0 L -3 2 L -1 4 -1 0';
        */
        formPoly = new google.maps.Polyline({
            path: sectionPoints,
            strokeColor: color,
            strokeOpacity: 0,
            strokeWeight: 1,
            icons :  [{
                  icon: {
                    path: svgPath,
                      strokeColor: color,
                      strokeOpacity: 1.0,
                      fillColor: color,
                      fillOpacity : .5,
                      strokeWeight: 1
                    },
                    repeat: '2px'
                }]
        });
    }
    else{
        //alert(polyLine);return;
        formPoly = new google.maps.Polyline({
            path: sectionPoints,
            strokeColor: color,
            strokeOpacity: 1,
            strokeWeight: 2
        });
    }
    formPoly.setMap(this.map);
    return formPoly; // for reference, to set null at a later point
  }

  /* TODO:NW figure out where to set constants, use an APP SETTINGS service */
  PARKING_TYPE_FREE:number = 1;
  PARKING_TYPE_PAID:number = 2;
  PARKING_TYPE_NO_PARKING:number = 3;
  PARKING_TYPE_PERMIT:number = 4;

  private getTypeColor(section:MapSection){
      if(section.main_parking_type_id == this.PARKING_TYPE_FREE && section.is_hours_restricted == 0 && !section.main_short_term_min)
          return '#00ff00';
      if(section.main_parking_type_id == this.PARKING_TYPE_NO_PARKING)
          return '#ff0000';
      if(section.main_parking_type_id == this.PARKING_TYPE_PAID && section.is_hours_restricted == 0)
          return '#ffff00';
      if(section.main_parking_type_id == this.PARKING_TYPE_PAID)
          return '#ffa500';
      if(section.main_parking_type_id == this.PARKING_TYPE_PERMIT)
          return '#993366';
      if(section.main_parking_type_id == this.PARKING_TYPE_FREE && section.is_hours_restricted)
          return '#0000ff';
      else
          return '#000000';
  }
}