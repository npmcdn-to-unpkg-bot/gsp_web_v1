import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

declare var google: any; // TODO:NW get types?? typings install google.maps --global

@Component({
  selector: 'my-map',
  template: '<div id="map-canvas"></div>'
})

export class MapComponent implements OnInit {
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
    //this.getHeroes();
  }
}