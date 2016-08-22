import { MapComponent } from '../map.component';
import { MapSection } from '../map-section';
import { AppSettings } from '../app-settings';

declare var google: any; // TODO:NW get types?? typings install google.maps --global

export class FormMarkers
{
  // no types for gmaps stuff for now
  mark1;
  mark2;
  sectionPoints;
  markerWithLabel;
  selectionPolyline;
  streetSide:number = 0;

  getEncodedSection = function (){
      return google.maps.geometry.encoding.encodePath(this.sectionPoints);
  }

  getSelectionPolyline = function (){
      return this.selectionPolyline;
  }

  showFormLink(map, mapComponent){
    var ll = new google.maps.LatLng(this.mark2.position.lat(), this.mark2.position.lng());
    var fm = this;
    if(this.markerWithLabel != undefined){
      //if already exists, clear it
      this.markerWithLabel.setMap(null);
    }
    this.markerWithLabel = new google.maps.Marker({
      position: ll,
      map: map,
      title: 'edit',
      icon: AppSettings.APP_RELATIVE_URL+'/images/add-icon.png',
      // TODO:NW find or make a lib to do marker with label
      // labelClass: "marker-label-v1", // the CSS class for the label
      // labelContent : 'Click to edit section'
    });
    google.maps.event.addListener(this.markerWithLabel, "click", function(){
      mapComponent.modalComponent.myModalIsVisible=true;
      mapComponent.modalComponent.componentName="section-update-form";
      mapComponent.modalComponent.title="New Section";
      let selectedSection = new MapSection(-1);
      selectedSection.newPolyline=true;
      selectedSection.mainParkingTypeId = AppSettings.PARKING_TYPE_FREE;
      selectedSection.streetSide = 0;
      selectedSection.hoursType = '';
      selectedSection.notes = '';
      mapComponent.modalComponent.selectedSection=selectedSection;
      mapComponent.ref.detectChanges();
      /*
      fm.streetSide = fm.streetSide + 1;
      if(fm.streetSide > 1)
          fm.streetSide = -1;
      var lblText = 'Click to toggle street direction: Cover all the selected section';
      if(fm.streetSide != 0)
          lblText = 'Click to toggle street direction: Covering one side of the selected section';
      fm.drawStreetSide();
      */
      //document.getElementById('.marker-label-v1').innerHTML(this.markerWithLabel.labelContent);
    });
    this.mark2.setMap(null);//replace second marker with link
  }

  drawSelection(pathPoints, map){
    if(this.selectionPolyline != undefined)
      this.selectionPolyline.setMap(null);
    this.selectionPolyline = new google.maps.Polyline({strokeColor: '#4986E7' });
    var path = new google.maps.MVCArray();
    this.sectionPoints = pathPoints;
    for (var i = 0, len = this.sectionPoints.length; i < len; i++) {
        path.push(this.sectionPoints[i]);
    }//add to points to draw
    this.selectionPolyline.setPath(path); //draw it
    this.selectionPolyline.setMap(map);
    return this.selectionPolyline;
  }

  clearSelection (){
    if(this.selectionPolyline!=undefined){
      this.selectionPolyline.setPath(new Array);
      this.selectionPolyline.setMap(null);
    }
  }

  clearMarkers (){
    this.mark1.setMap(null);
    this.mark2.setMap(null);
    this.mark1 = undefined;
    this.mark2 = undefined;
  }

  drawBlockSelection(map){
    let pathPoints = new Array();
    let self = this;
    /* For now disable, make it follow streets
    if($('#manual-section').is(':checked') == true){
        pathPoints.push(this.getMarker1().position);
        pathPoints.push(this.getMarker2().position);
        this.drawSelection(pathPoints);
    } else ...
      */
      //Intialize the Direction Service
    let service = new google.maps.DirectionsService();
    service.route({
        origin: this.mark1.position,
        destination: this.mark2.position,
        travelMode: google.maps.DirectionsTravelMode.WALKING
    }, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            self.drawSelection(result.routes[0].overview_path, map);
        }
    });
  }

  placeSectionMarker(latLng, map, mapComponent:MapComponent){
    if(!this.mark1){
      this.mark1 = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'Start Point!'
      });
      if(this.markerWithLabel){
        this.markerWithLabel.setMap(null);
        this.markerWithLabel = undefined;
      }
    }
    else if(!this.mark2){
      this.mark2 = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'End Point!'
      });
      this.drawBlockSelection(map);
      this.showFormLink(map, mapComponent);
    }
    else{
        this.clearMarkers();
        this.clearSelection();
        //select the first point
        this.mark1 = new google.maps.Marker({
          position: latLng,
          map: map,
          title: 'Start Point!'
        });
    }
  }

}