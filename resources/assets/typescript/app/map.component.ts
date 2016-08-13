import { Component, NgZone, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { ModalContainerComponent } from './modal-container.component';
import { MapSection } from './map-section';
import { MapSectionService } from './map-section.service';
import { SectionRendererService } from './section-renderer.service';

declare var google: any; // TODO:NW get types?? typings install google.maps --global

@Component({
  selector: 'my-map',
  template: '<div id="map-canvas"></div><modal-container title="Section Notes"></modal-container>',
  providers: [ MapSectionService, SectionRendererService ]
})

export class MapComponent implements OnInit {
  loadedSections:MapSection[];
  myModalIsVisible:boolean;
  map:any;
  @ViewChild(ModalContainerComponent)
  private modalComponent: ModalContainerComponent;

  constructor(private mapSectionService: MapSectionService, private sectionRendererService:SectionRendererService, private zone:NgZone, private ref:ChangeDetectorRef) { }

  ngOnInit() {
    //this.myModalIsVisible=false;
    //debugger;
    var mapOptions = {
      center: new google.maps.LatLng(40.762, -111.855),
      zoom: 16,
      draggableCursor:"crosshair",
      draggingCursor:"crosshair",
      scaleControl:true,
      disableDoubleClickZoom:true
    };
    this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var self = this;

    google.maps.event.addListener(this.map, 'tilesloaded', function() {
      var mapData = {
        minLat: self.map.getBounds().getSouthWest().lat(),
        maxLat: self.map.getBounds().getNorthEast().lat(),
        minLng: self.map.getBounds().getSouthWest().lng(),
        maxLng: self.map.getBounds().getNorthEast().lng(),
      };
      // (param1, param2, …, paramN) => { statements }
      // (param1, param2, …, paramN) => expression AND no paren when one param eg sections
      
      //this.mapSectionService.loadSectionsForMapView().then(sections => this.loadedSections = sections);
      self.mapSectionService.loadSectionsForMap(mapData).then(sections => {
        //var test = sections;
        // debugger;
        self.loadedSections = sections;
        self.renderSectionsForView();
      });
    });

  }

  renderSectionsForView(){
    let self = this;
    let sectionsArray = this.loadedSections;
    for (let i=0; i < sectionsArray.length; i++) {
      let sectionPoints = google.maps.geometry.encoding.decodePath(sectionsArray[i].polyline);
      let color = this.sectionRendererService.getTypeColor(sectionsArray[i]);
      this.sectionRendererService.drawSection(sectionPoints, sectionsArray[i].street_side, color, this.map);
      //don't show info for things with no notes
      if(
            sectionsArray[i].notes != undefined &&
            sectionsArray[i].notes != null &&
            sectionsArray[i].notes != ""
        ){
        let marker = this.sectionRendererService.drawSectionInfoMarker(sectionsArray[i], this.map);
        
        google.maps.event.addListener(marker, 'click', function() {
          /*
          self.showSectionInfo();
          self.myModalIsVisible = true;
          //debugger;
          */
          self.modalComponent.myModalIsVisible=true;
          
          /*
          // TODO:NW figure out why the zone has to be run like this for google events to show changes
          // and only appears the first time
          // either of the next two things worked

          self.zone.run(() => {
            console.log('marker clicked');
          }); */

          self.ref.detectChanges();
        });

      }
      //alert(sectionsArray[i].id);
    }
  }

  showSectionInfo(){
    // how to get self as scopt of this in section renderer?
    //this.myModalIsVisible = true;
    //debugger;
    /*
    $('#section-info').html(
      'Id: ' + section.id + '<br />' +
      'Hours: <br />' + this.getHoursDisplay(section.hours_data) + '<br />' +
      'Notes: ' + section.notes + '<br />' + 
      '<a href="#" onclick="$(\'#section-info\').hide();return false;">Close</a>'
    );
    $('#section-info').show();
    */
  }
}