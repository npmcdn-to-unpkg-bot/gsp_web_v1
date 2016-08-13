System.register(['@angular/core', './map-section.service'], function(exports_1, context_1) {
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
    var core_1, map_section_service_1;
    var MapComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (map_section_service_1_1) {
                map_section_service_1 = map_section_service_1_1;
            }],
        execute: function() {
            let MapComponent = class MapComponent {
                constructor(mapSectionService) {
                    this.mapSectionService = mapSectionService;
                }
                ngOnInit() {
                    var mapOptions = {
                        center: new google.maps.LatLng(40.762, -111.855),
                        zoom: 16,
                        draggableCursor: "crosshair",
                        draggingCursor: "crosshair",
                        scaleControl: true,
                        disableDoubleClickZoom: true
                    };
                    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
                    var self = this;
                    google.maps.event.addListener(map, 'tilesloaded', function () {
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
                            var test = sections;
                            debugger;
                            self.loadedSections = sections;
                        });
                    });
                }
            };
            MapComponent = __decorate([
                // TODO:NW get types?? typings install google.maps --global
                core_1.Component({
                    selector: 'my-map',
                    template: '<div id="map-canvas"></div>',
                    providers: [map_section_service_1.MapSectionService],
                }), 
                __metadata('design:paramtypes', [map_section_service_1.MapSectionService])
            ], MapComponent);
            exports_1("MapComponent", MapComponent);
        }
    }
});
