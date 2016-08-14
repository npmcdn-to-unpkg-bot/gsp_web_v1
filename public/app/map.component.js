System.register(['@angular/core', './modal-container.component', './map-section.service', './section-renderer.service', './app-settings'], function(exports_1, context_1) {
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
    var core_1, modal_container_component_1, map_section_service_1, section_renderer_service_1, app_settings_1;
    var MapComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (modal_container_component_1_1) {
                modal_container_component_1 = modal_container_component_1_1;
            },
            function (map_section_service_1_1) {
                map_section_service_1 = map_section_service_1_1;
            },
            function (section_renderer_service_1_1) {
                section_renderer_service_1 = section_renderer_service_1_1;
            },
            function (app_settings_1_1) {
                app_settings_1 = app_settings_1_1;
            }],
        execute: function() {
            let MapComponent = class MapComponent {
                constructor(mapSectionService, sectionRendererService, ref) {
                    this.mapSectionService = mapSectionService;
                    this.sectionRendererService = sectionRendererService;
                    this.ref = ref;
                }
                ngOnInit() {
                    //this.myModalIsVisible=false;
                    //debugger;
                    var mapOptions = {
                        center: new google.maps.LatLng(40.762, -111.855),
                        zoom: 16,
                        draggableCursor: "crosshair",
                        draggingCursor: "crosshair",
                        scaleControl: true,
                        disableDoubleClickZoom: true
                    };
                    this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
                    var self = this;
                    google.maps.event.addListener(this.map, 'tilesloaded', function () {
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
                renderSectionsForView() {
                    let self = this;
                    let sectionsArray = this.loadedSections;
                    for (let i = 0; i < sectionsArray.length; i++) {
                        let sectionPoints = google.maps.geometry.encoding.decodePath(sectionsArray[i].polyline);
                        let color = app_settings_1.AppSettings.getTypeColor(sectionsArray[i]);
                        let newSection = this.sectionRendererService.drawSection(sectionPoints, sectionsArray[i].streetSide, color, this.map);
                        // onclick show modal with edit form (TODO:NW only if logged in as admin)
                        google.maps.event.addListener(newSection, 'click', function () {
                            self.modalComponent.myModalIsVisible = true;
                            self.modalComponent.componentName = "section-update-form";
                            self.modalComponent.title = "Update Section";
                            self.modalComponent.selectedSection = sectionsArray[i];
                            self.ref.detectChanges();
                        });
                        //don't show info for things with no notes
                        if (sectionsArray[i].notes != undefined &&
                            sectionsArray[i].notes != null &&
                            sectionsArray[i].notes != "") {
                            let marker = this.sectionRendererService.drawSectionInfoMarker(sectionsArray[i], this.map);
                            google.maps.event.addListener(marker, 'click', function () {
                                /*
                                self.showSectionInfo();
                                self.myModalIsVisible = true;
                                //debugger;
                                */
                                self.modalComponent.myModalIsVisible = true;
                                self.modalComponent.componentName = "section-info";
                                self.modalComponent.title = "Parking Info";
                                self.modalComponent.selectedSection = sectionsArray[i];
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
                    }
                }
                showSectionInfo() {
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
            };
            __decorate([
                core_1.ViewChild(modal_container_component_1.ModalContainerComponent), 
                __metadata('design:type', modal_container_component_1.ModalContainerComponent)
            ], MapComponent.prototype, "modalComponent", void 0);
            MapComponent = __decorate([
                // TODO:NW get types?? typings install google.maps --global
                core_1.Component({
                    selector: 'my-map',
                    // if a edit section form
                    //template: '<div id="map-canvas"></div><modal-container title="Section Notes" contentType="edit_section"></modal-container>',
                    template: '<div id="map-canvas"></div><modal-container title="Section Notes" contentType="simple_string" contentString="Section Notes Here"></modal-container>',
                    providers: [map_section_service_1.MapSectionService, section_renderer_service_1.SectionRendererService]
                }), 
                __metadata('design:paramtypes', [map_section_service_1.MapSectionService, section_renderer_service_1.SectionRendererService, core_1.ChangeDetectorRef])
            ], MapComponent);
            exports_1("MapComponent", MapComponent);
        }
    }
});
