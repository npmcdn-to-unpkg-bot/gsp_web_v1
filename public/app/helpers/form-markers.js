System.register(['../map-section', '../app-settings'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var map_section_1, app_settings_1;
    var FormMarkers;
    return {
        setters:[
            function (map_section_1_1) {
                map_section_1 = map_section_1_1;
            },
            function (app_settings_1_1) {
                app_settings_1 = app_settings_1_1;
            }],
        execute: function() {
            class FormMarkers {
                constructor() {
                    this.streetSide = 0;
                    this.getEncodedSection = function () {
                        return google.maps.geometry.encoding.encodePath(this.sectionPoints);
                    };
                    this.getSelectionPolyline = function () {
                        return this.selectionPolyline;
                    };
                }
                showFormLink(map, mapComponent) {
                    var ll = new google.maps.LatLng(this.mark2.position.lat(), this.mark2.position.lng());
                    var fm = this;
                    if (this.markerWithLabel != undefined) {
                        //if already exists, clear it
                        this.markerWithLabel.setMap(null);
                    }
                    this.markerWithLabel = new google.maps.Marker({
                        position: ll,
                        map: map,
                        title: 'edit',
                        icon: app_settings_1.AppSettings.APP_RELATIVE_URL + '/images/add-icon.png',
                    });
                    google.maps.event.addListener(this.markerWithLabel, "click", function () {
                        mapComponent.modalComponent.myModalIsVisible = true;
                        mapComponent.modalComponent.componentName = "section-update-form";
                        mapComponent.modalComponent.title = "New Section";
                        let selectedSection = new map_section_1.MapSection(-1);
                        selectedSection.newPolyline = true;
                        selectedSection.mainParkingTypeId = app_settings_1.AppSettings.PARKING_TYPE_FREE;
                        selectedSection.streetSide = 0;
                        selectedSection.hoursType = '';
                        selectedSection.notes = '';
                        mapComponent.modalComponent.selectedSection = selectedSection;
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
                    this.mark2.setMap(null); //replace second marker with link
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
                placeSectionMarker(latLng, map, mapComponent) {
                    if (!this.mark1) {
                        this.mark1 = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: 'Start Point!'
                        });
                        if (this.markerWithLabel) {
                            this.markerWithLabel.setMap(null);
                            this.markerWithLabel = undefined;
                        }
                    }
                    else if (!this.mark2) {
                        this.mark2 = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: 'End Point!'
                        });
                        this.drawBlockSelection(map);
                        this.showFormLink(map, mapComponent);
                    }
                    else {
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
            exports_1("FormMarkers", FormMarkers);
        }
    }
});
