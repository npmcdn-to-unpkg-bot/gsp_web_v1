import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { ModalContainerComponent } from './modal-container.component';
import { MapSection } from './map-section';
import { MapSectionService } from './map-section.service';
import { SectionRendererService } from './section-renderer.service';

import { FormMarkers } from './helpers/form-markers';

declare var google: any;  // TODO:NW get types?? typings install google.maps --global

@Component({
  selector: 'my-map',
  template: '<div id="map-canvas"></div><modal-container></modal-container>\
    <input id="search-input" class="controls" type="text" placeholder="Search">',
  providers: [ MapSectionService, SectionRendererService, FormMarkers ]
})

export class MapComponent implements OnInit {

  loadedSections:MapSection[];
  myModalIsVisible:boolean;
  map:any;
  @ViewChild(ModalContainerComponent)
  modalComponent: ModalContainerComponent;

  constructor(private mapSectionService: MapSectionService, 
    private sectionRendererService:SectionRendererService,
    private ref:ChangeDetectorRef,
    private formMarkersService: FormMarkers
  ) { }

  ngOnInit() {
    var self=this;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        self.loadMap(pos);
      }, function(posError) {
        self.loadMap({lat: 40.762, lng : -111.855});
        console.log('Make sure your site is loaded over https');
      });
    } else {
      self.loadMap({lat: 40.762, lng : -111.855});
      console.log('Browser doesn\'t support Geolocation');
    }

  }

  loadMap(startPosition){
     var mapOptions = {
      // center: new google.maps.LatLng(40.762, -111.855),
      center: new google.maps.LatLng(startPosition.lat, startPosition.lng),
      zoom: 16,
      draggableCursor:"crosshair",
      draggingCursor:"crosshair",
      scaleControl:true,
      disableDoubleClickZoom:true
    };
    var self = this;
    self.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    google.maps.event.addListener(this.map, 'tilesloaded', function() {
      var mapData = {
        minLat: self.map.getBounds().getSouthWest().lat(),
        maxLat: self.map.getBounds().getNorthEast().lat(),
        minLng: self.map.getBounds().getSouthWest().lng(),
        maxLng: self.map.getBounds().getNorthEast().lng(),
      };
      
      self.mapSectionService.loadSectionsForMap(mapData).then(sections => {
        self.loadedSections = sections;
        // TODO:NW figure out a consistent way to get response arrays as typed arrays in js
        self.loadedSections=self.loadedSections.map(function(obj){
          let ms:MapSection = new MapSection(obj.id);
          for (var key in obj) {
            ms[key] = obj[key];
          }
          return ms;
        });
        self.renderSectionsForView();
      });
    });

    google.maps.event.addListener(this.map, 'dblclick', function (event) {
      self.formMarkersService.placeSectionMarker(event.latLng, self.map, self);
    });

    self.addSearchBox();

  }

  addSearchBox(){
    let self=this;
    // Create the search box and link it to the UI element.
    let input = document.getElementById('search-input');
    let searchBox = new google.maps.places.SearchBox(input);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    input.style.display = 'block';

    // Bias the SearchBox results towards current map's viewport.
    this.map.addListener('bounds_changed', function() {
      searchBox.setBounds(self.map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // For each place, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      self.map.fitBounds(bounds);
      let listener = google.maps.event.addListenerOnce(self.map, "idle", function() { 
        self.map.setZoom(16); 
        google.maps.event.removeListener(listener); 
      });
    });

  }

  renderSectionsForView(){
    let self = this;
    let sectionsArray = this.loadedSections;
    for (let i=0; i < sectionsArray.length; i++) {
      let sectionPoints = google.maps.geometry.encoding.decodePath(sectionsArray[i].polyline);
      let color = MapSection.getTypeColor(sectionsArray[i]);
      let newSection = this.sectionRendererService.drawSection(sectionPoints, sectionsArray[i].streetSide, color, this.map);
      
      // onclick show modal with edit form (TODO:NW only if logged in as admin)
      google.maps.event.addListener(newSection, 'click', function() {
          self.modalComponent.myModalIsVisible=true;
          self.modalComponent.componentName="section-update-form";
          self.modalComponent.title="Update Section";
          self.modalComponent.selectedSection=sectionsArray[i];
          self.ref.detectChanges();
        });

      // If has hours, no notes, show clock icon
      // If has hours and notes, show clock/info icon, one image merged
      // If has notes, no hours, show i icon
      let showMarker = false;
      let iconName = '';
      let n = sectionsArray[i].notes;
      if(sectionsArray[i].isHoursRestricted == 1){
        showMarker=true;
        iconName = 'hours-icon.png';
        if(n != undefined && n != null && n != ""){
          iconName = 'infohours-icon.png';
        }
      } else if(n != undefined && n != null && n != ""){
        showMarker=true;
        iconName = 'info-icon.png';
      }

      if(showMarker){
        let marker = this.sectionRendererService.drawSectionInfoMarker(sectionsArray[i], this.map, iconName);
        // TODO:NW watchout if no marker rendered b/c of something off
        google.maps.event.addListener(marker, 'click', function() {
          /*
          self.showSectionInfo();
          self.myModalIsVisible = true;
          //debugger;
          */
          self.modalComponent.myModalIsVisible=true;
          self.modalComponent.componentName="section-info";
          self.modalComponent.title="Parking Info";
          self.modalComponent.selectedSection=sectionsArray[i];
          // TODO:NW how to set a complex set of data or display on change
          self.modalComponent.selectedSection.updateHoursHtml();
          
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
  
}