import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { ModalContainerComponent } from '../components/modal-container';
import { MapSection } from '../models/map-section';
import { MapPoint } from '../models/map-point';
import { MapSectionService } from '../services/map-section';
import { MapPointService } from '../services/map-point';
import { SectionRendererHelper } from '../helpers/section-renderer';
import { FormMarkers } from '../services/form-markers';
import { AppSettings } from '../app-settings';

declare var google: any;  // TODO:NW get types?? typings install google.maps --global

@Component({
  selector: 'my-map',
  template: '<div id="map-canvas"></div><modal-container></modal-container>\
    <input id="search-input" class="controls" type="text" placeholder="Search">',
  providers: [ MapSectionService, MapPointService, FormMarkers ]
})

export class MapComponent implements OnInit {

  loadedSections:MapSection[];
  loadedPoints:MapPoint[];
  myModalIsVisible:boolean;
  map:any;
  @ViewChild(ModalContainerComponent)
  modalComponent: ModalContainerComponent;
  Markers:any[] = [];
  infoMarkers:any[] = [];
  pointMarkers:any[] = [];

  constructor(private mapSectionService: MapSectionService, 
    private mapPointsService:MapPointService,
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
    self.addMapListener('tilesloaded', self.handleTilesLoaded);
    self.addMapListener('dblclick', self.handleDoubleClick);
    self.addMapListener('zoom_changed', self.handleZoomChange);
    self.addSearchBox();
  }

  addMapListener(eventName:string, handler:Function){
    let self = this;
    this.map.addListener(eventName, function(event){
      handler(self, event);
    });
  }

  handleTilesLoaded(self, e){
    let mapData = {
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

    self.mapPointsService.loadPointsForMap(mapData).then(points => {
      self.loadedPoints = points;
      // TODO:NW figure out a consistent way to get response arrays as typed arrays in js
      self.loadedPoints=self.loadedPoints.map(function(obj){
        let mp:MapPoint = new MapPoint(obj.id);
        for (var key in obj) {
          mp[key] = obj[key];
        }
        return mp;
      });
      self.renderPointsForView();
    });
  }

  handleDoubleClick(self,event){
    self.formMarkersService.placeSectionMarker(event.latLng, self.map, self);
  }

  // called before renderSectionsForView on zoom change
  handleZoomChange(self, event){
    // alert(self.map.zoom);
    
    for (let i=0; i < self.infoMarkers.length; i++) {
      if(self.map.zoom < 16){
        // TODO:NW figure out why array has weird other members
        if(self.infoMarkers[i].setMap)
          self.infoMarkers[i].setMap(null);
      } else{
        if(self.infoMarkers[i].setMap)
          self.infoMarkers[i].setMap(self.map);
      } 
    }

    for (let i=0; i < self.pointMarkers.length; i++) {
      if(self.map.zoom < 16){
        // TODO:NW figure out why array has weird other members
        if(self.pointMarkers[i].setMap)
          self.pointMarkers[i].setMap(null);
      } else{
        if(self.pointMarkers[i].setMap)
          self.pointMarkers[i].setMap(self.map);
      } 
    }

    /* renderSectionsForView takes care of setting up markers
    for (let i=0; i < self.loadedSections.length; i++) {
      let section = self.loadedSections[i];
      let n = section.notes;
      let iconName = self.getIconForSection(section);
      if(iconName!=''){
        let marker = self.sectionRendererService.drawSectionInfoMarker(section, self.map, iconName);
        // add click addListener
        self.infoMarkers.push(marker);
      }
    } */
  }

  // called from handleTilesLoaded
  private renderSectionsForView(){
    let self = this;
    let sectionsArray = this.loadedSections;
    for (let i=0; i < sectionsArray.length; i++) {
      let sectionPoints = google.maps.geometry.encoding.decodePath(sectionsArray[i].polyline);
      let color = MapSection.getTypeColor(sectionsArray[i]);
      let section = sectionsArray[i];
      
      // TODO:NW check the array, if already there don't re-render (maybe google smartly handles this already?)
      // also preserve markers
      let newSection = SectionRendererHelper.drawSection(sectionPoints, section.streetSide, color, this.map);
      
      // onclick show modal with edit form (TODO:NW only if logged in as admin)
      google.maps.event.addListener(newSection, 'click', function() {
        self.showModal("section-update-form","Update Section", section);
        self.ref.detectChanges();
      });

      if(self.map.zoom < 16){
        continue;
      }

      let iconName = self.getIconForSection(section);
      if(iconName!=''){
        let marker = SectionRendererHelper.drawSectionInfoMarker(section, this.map, iconName);
        // TODO:NW watchout if no marker rendered b/c of something off
        google.maps.event.addListener(marker, 'click', function() {
          self.showModal("section-info","Parking Info", section);
          // TODO:NW how to set a complex set of data or display on change
          self.modalComponent.selectedModel.updateHoursHtml();
          
          /*
          // TODO:NW figure out why the zone has to be run like this for google events to show changes
          // and only appears the first time either of the next two things worked
          self.zone.run(() => {
            console.log('marker clicked');
          }); 
          OR: ... */
          self.ref.detectChanges();
        });

        self.infoMarkers.push(marker);
      }
    }
  }

  // called from handleTilesLoaded
  private renderPointsForView(){
    let self = this;
    for (let i=0; i < this.loadedPoints.length; i++) {
      let point = this.loadedPoints[i];
      
      if(self.map.zoom < 16){
        continue;
      }


      let iconName = MapPoint.getTypeIcon(point);
      if(iconName!=''){
        let latLng = new google.maps.LatLng(point.lat, point.lng);
        let marker = new google.maps.Marker({
            position: latLng,
            map: self.map,
            icon: AppSettings.APP_RELATIVE_URL+'/images/' + iconName,
            title: ''
        });
        google.maps.event.addListener(marker, 'click', function() {
          self.showModal("point-update-form","Edit Map Point", point);
          self.ref.detectChanges();
        });
        self.pointMarkers.push(marker);
      }
    }
  }

  private showModal(componentName:string, title:string, model:any){
    this.modalComponent.myModalIsVisible=true;
    this.modalComponent.componentName=componentName;
    this.modalComponent.title=title;
    this.modalComponent.selectedModel=model;
  }

  //return blank string if no icon
  private getIconForSection(section:MapSection){
    let iconName = '';
    let n = section.notes;
    if(section.isHoursRestricted == 1){
        iconName = 'hours-icon.png';
        if(n != undefined && n != null && n != ""){
          iconName = 'infohours-icon.png';
        }
      } else if(n != undefined && n != null && n != ""){
        iconName = 'info-icon.png';
      }
      return iconName; 
  }

  // from online example by google
  private addSearchBox(){
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
  
}