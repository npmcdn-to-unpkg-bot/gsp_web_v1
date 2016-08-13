import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MapSection } from './map-section';
import { MapSectionService } from './map-section.service';

declare var google: any; // TODO:NW get types?? typings install google.maps --global

@Component({
  selector: 'my-map',
  template: '<div id="map-canvas"></div>',
  providers: [ MapSectionService ],
})

export class MapComponent implements OnInit {
  // I think just put this in module def ??
  //providers: [MapSectionService];
  loadedSections:MapSection[];

  constructor(private mapSectionService: MapSectionService) { }

  ngOnInit() {
    var mapOptions = {
      center: new google.maps.LatLng(40.762, -111.855),
      zoom: 16,
      draggableCursor:"crosshair",
      draggingCursor:"crosshair",
      scaleControl:true,
      disableDoubleClickZoom:true
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var self = this;

    google.maps.event.addListener(map, 'tilesloaded', function() {
      var mapData = {
        minLat: map.getBounds().getSouthWest().lat(),
        maxLat: map.getBounds().getNorthEast().lat(),
        minLng: map.getBounds().getSouthWest().lng(),
        maxLng: map.getBounds().getNorthEast().lng(),
      };
      // (param1, param2, …, paramN) => { statements }
      // (param1, param2, …, paramN) => expression AND no paren when one param eg sections
      
      //this.mapSectionService.loadSectionsForMapView().then(sections => this.loadedSections = sections);
      self.mapSectionService.loadSectionsForMap(mapData).then(sections => {
        //var test = sections;
        // debugger;
        self.loadedSections = sections;
      });
    });
  }
}