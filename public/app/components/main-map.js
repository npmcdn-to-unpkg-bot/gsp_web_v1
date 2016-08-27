System.register(['@angular/core', '../components/modal-container', '../models/map-section', '../services/map-section', '../helpers/section-renderer', '../services/form-markers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, modal_container_1, map_section_1, map_section_2, section_renderer_1, form_markers_1;
    var MapComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (modal_container_1_1) {
                modal_container_1 = modal_container_1_1;
            },
            function (map_section_1_1) {
                map_section_1 = map_section_1_1;
            },
            function (map_section_2_1) {
                map_section_2 = map_section_2_1;
            },
            function (section_renderer_1_1) {
                section_renderer_1 = section_renderer_1_1;
            },
            function (form_markers_1_1) {
                form_markers_1 = form_markers_1_1;
            }],
        execute: function() {
            let MapComponent = class MapComponent {
                constructor(mapSectionService, sectionRendererService, ref, formMarkersService) {
                    this.mapSectionService = mapSectionService;
                    this.sectionRendererService = sectionRendererService;
                    this.ref = ref;
                    this.formMarkersService = formMarkersService;
                    this.mapMarkers = [];
                }
                ngOnInit() {
                    var self = this;
                    // Try HTML5 geolocation.
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            var pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                            self.loadMap(pos);
                        }, function (posError) {
                            self.loadMap({ lat: 40.762, lng: -111.855 });
                            console.log('Make sure your site is loaded over https');
                        });
                    }
                    else {
                        self.loadMap({ lat: 40.762, lng: -111.855 });
                        console.log('Browser doesn\'t support Geolocation');
                    }
                }
                loadMap(startPosition) {
                    var mapOptions = {
                        // center: new google.maps.LatLng(40.762, -111.855),
                        center: new google.maps.LatLng(startPosition.lat, startPosition.lng),
                        zoom: 16,
                        draggableCursor: "crosshair",
                        draggingCursor: "crosshair",
                        scaleControl: true,
                        disableDoubleClickZoom: true
                    };
                    var self = this;
                    self.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
                    self.addMapListener('tilesloaded', self.handleTilesLoaded);
                    self.addMapListener('dblclick', self.handleDoubleClick);
                    self.addMapListener('zoom_changed', self.handleZoomChange);
                    self.addSearchBox();
                }
                addMapListener(eventName, handler) {
                    let self = this;
                    this.map.addListener(eventName, function (event) {
                        handler(self, event);
                    });
                }
                handleTilesLoaded(self, e) {
                    let mapData = {
                        minLat: self.map.getBounds().getSouthWest().lat(),
                        maxLat: self.map.getBounds().getNorthEast().lat(),
                        minLng: self.map.getBounds().getSouthWest().lng(),
                        maxLng: self.map.getBounds().getNorthEast().lng(),
                    };
                    self.mapSectionService.loadSectionsForMap(mapData).then(sections => {
                        self.loadedSections = sections;
                        // TODO:NW figure out a consistent way to get response arrays as typed arrays in js
                        self.loadedSections = self.loadedSections.map(function (obj) {
                            let ms = new map_section_1.MapSection(obj.id);
                            for (var key in obj) {
                                ms[key] = obj[key];
                            }
                            return ms;
                        });
                        self.renderSectionsForView();
                    });
                }
                handleDoubleClick(self, event) {
                    self.formMarkersService.placeSectionMarker(event.latLng, self.map, self);
                }
                // called before renderSectionsForView on zoom change
                handleZoomChange(self, event) {
                    // alert(self.map.zoom);
                    for (let i = 0; i < self.mapMarkers.length; i++) {
                        if (self.map.zoom < 16) {
                            self.mapMarkers[i].setMap(null);
                        }
                        else {
                            self.mapMarkers[i].setMap(self.map);
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
                        self.mapMarkers.push(marker);
                      }
                    } */
                }
                // called from handleTilesLoaded
                renderSectionsForView() {
                    let self = this;
                    let sectionsArray = this.loadedSections;
                    for (let i = 0; i < sectionsArray.length; i++) {
                        let sectionPoints = google.maps.geometry.encoding.decodePath(sectionsArray[i].polyline);
                        let color = map_section_1.MapSection.getTypeColor(sectionsArray[i]);
                        let section = sectionsArray[i];
                        // TODO:NW check the array, if already there don't re-render (maybe google smartly handles this already?)
                        // also preserve markers
                        let newSection = this.sectionRendererService.drawSection(sectionPoints, section.streetSide, color, this.map);
                        // onclick show modal with edit form (TODO:NW only if logged in as admin)
                        google.maps.event.addListener(newSection, 'click', function () {
                            self.showModal("section-update-form", "Update Section", section);
                            self.ref.detectChanges();
                        });
                        if (self.map.zoom < 16) {
                            continue;
                        }
                        let iconName = self.getIconForSection(section);
                        if (iconName != '') {
                            let marker = this.sectionRendererService.drawSectionInfoMarker(section, this.map, iconName);
                            // TODO:NW watchout if no marker rendered b/c of something off
                            google.maps.event.addListener(marker, 'click', function () {
                                self.showModal("section-info", "Parking Info", section);
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
                            self.mapMarkers.push(marker);
                        }
                    }
                }
                showModal(componentName, title, section) {
                    this.modalComponent.myModalIsVisible = true;
                    this.modalComponent.componentName = componentName;
                    this.modalComponent.title = title;
                    this.modalComponent.selectedModel = section;
                }
                //return blank string if no icon
                getIconForSection(section) {
                    let iconName = '';
                    let n = section.notes;
                    if (section.isHoursRestricted == 1) {
                        iconName = 'hours-icon.png';
                        if (n != undefined && n != null && n != "") {
                            iconName = 'infohours-icon.png';
                        }
                    }
                    else if (n != undefined && n != null && n != "") {
                        iconName = 'info-icon.png';
                    }
                    return iconName;
                }
                // from online example by google
                addSearchBox() {
                    let self = this;
                    // Create the search box and link it to the UI element.
                    let input = document.getElementById('search-input');
                    let searchBox = new google.maps.places.SearchBox(input);
                    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
                    input.style.display = 'block';
                    // Bias the SearchBox results towards current map's viewport.
                    this.map.addListener('bounds_changed', function () {
                        searchBox.setBounds(self.map.getBounds());
                    });
                    // Listen for the event fired when the user selects a prediction and retrieve
                    // more details for that place.
                    searchBox.addListener('places_changed', function () {
                        var places = searchBox.getPlaces();
                        if (places.length == 0) {
                            return;
                        }
                        // For each place, name and location.
                        var bounds = new google.maps.LatLngBounds();
                        places.forEach(function (place) {
                            if (!place.geometry) {
                                console.log("Returned place contains no geometry");
                                return;
                            }
                            if (place.geometry.viewport) {
                                // Only geocodes have viewport.
                                bounds.union(place.geometry.viewport);
                            }
                            else {
                                bounds.extend(place.geometry.location);
                            }
                        });
                        self.map.fitBounds(bounds);
                        let listener = google.maps.event.addListenerOnce(self.map, "idle", function () {
                            self.map.setZoom(16);
                            google.maps.event.removeListener(listener);
                        });
                    });
                }
            };
            __decorate([
                core_1.ViewChild(modal_container_1.ModalContainerComponent), 
                __metadata('design:type', modal_container_1.ModalContainerComponent)
            ], MapComponent.prototype, "modalComponent", void 0);
            MapComponent = __decorate([
                // TODO:NW get types?? typings install google.maps --global
                core_1.Component({
                    selector: 'my-map',
                    template: '<div id="map-canvas"></div><modal-container></modal-container>\
    <input id="search-input" class="controls" type="text" placeholder="Search">',
                    providers: [map_section_2.MapSectionService, section_renderer_1.SectionRendererService, form_markers_1.FormMarkers]
                }), 
                __metadata('design:paramtypes', [map_section_2.MapSectionService, section_renderer_1.SectionRendererService, core_1.ChangeDetectorRef, form_markers_1.FormMarkers])
            ], MapComponent);
            exports_1("MapComponent", MapComponent);
        }
    }
});
