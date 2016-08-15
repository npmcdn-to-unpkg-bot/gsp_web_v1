//import { MapSection } from './map-section';
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FormMarkers;
    return {
        setters:[],
        execute: function() {
            class FormMarkers {
                constructor() {
                    this.streetSide = 0;
                    this.setMarker1 = function (m1) {
                        this.mark1 = m1;
                    };
                    this.getMarker1 = function () {
                        return this.mark1;
                    };
                    this.setMarker2 = function (m2) {
                        this.mark2 = m2;
                    };
                    this.getMarker2 = function () {
                        return this.mark2;
                    };
                    this.getSectionPoints = function () {
                        return this.sectionPoints;
                    };
                    this.getEncodedSection = function () {
                        return google.maps.geometry.encoding.encodePath(this.sectionPoints);
                    };
                    this.getSelectionPolyline = function () {
                        return this.selectionPolyline;
                    };
                    this.getStreetSide = function () {
                        return this.streetSide;
                    };
                    this.setStreetSide = function (ss) {
                        this.streetSide = ss;
                    };
                }
                showFormLink(m2) {
                    /*
                    var ll = new google.maps.LatLng(this.mark2.position.lat(), this.mark2.position.lng());
                    var fm = this;
                    if(this.markerWithLabel != undefined){
                      //if already exists, clear it
                      this.markerWithLabel.setMap(null);
                    }
                    this.markerWithLabel = new MarkerWithLabel({
                      position: ll,
                      map: map,
                      title: 'hi',
                      labelClass: "marker-label-v1", // the CSS class for the label
                      labelContent : 'Click to Select Street Direction'
                    });
                    google.maps.event.addListener(this.markerWithLabel, "click", function(){
                      fm.streetSide = fm.streetSide + 1;
                      if(fm.streetSide > 1)
                          fm.streetSide = -1;
                      var lblText = 'Click to toggle street direction: Cover all the selected section';
                      if(fm.streetSide != 0)
                          lblText = 'Click to toggle street direction: Covering one side of the selected section';
                      fm.drawStreetSide();
                      $('.marker-label-v1').html(lblText);
                    });
                    this.mark2.setMap(null);//replace second marker with link
                    */
                }
                drawSelection(pathPoints, map) {
                    if (this.selectionPolyline != undefined)
                        this.selectionPolyline.setMap(null);
                    this.selectionPolyline = new google.maps.Polyline({ strokeColor: '#4986E7' });
                    var path = new google.maps.MVCArray();
                    this.sectionPoints = pathPoints;
                    for (var i = 0, len = this.sectionPoints.length; i < len; i++) {
                        path.push(this.sectionPoints[i]);
                    } //add to points to draw
                    this.selectionPolyline.setPath(path); //draw it
                    this.selectionPolyline.setMap(map);
                    return this.selectionPolyline;
                }
                clearSelection() {
                    if (this.selectionPolyline != undefined) {
                        this.selectionPolyline.setPath(new Array);
                        this.selectionPolyline.setMap(null);
                    }
                }
                clearMarkers() {
                    this.mark1.setMap(null);
                    this.mark2.setMap(null);
                    this.mark1 = undefined;
                    this.mark2 = undefined;
                }
                drawBlockSelection(map) {
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
                placeSectionMarker(latLng, map) {
                    if (!this.getMarker1()) {
                        this.setMarker1(new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: 'Start Point!'
                        }));
                    }
                    else if (!this.getMarker2()) {
                        this.setMarker2(new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: 'End Point!'
                        }));
                        this.drawBlockSelection(map);
                    }
                    else {
                        this.clearMarkers();
                        this.clearSelection();
                        //select the first point
                        this.setMarker1(new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: 'Start Point!'
                        }));
                    }
                }
            }
            exports_1("FormMarkers", FormMarkers);
        }
    }
});
