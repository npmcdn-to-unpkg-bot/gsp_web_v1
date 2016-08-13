System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var SectionRendererService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            let SectionRendererService = class SectionRendererService {
                constructor() {
                    /* TODO:NW figure out where to set constants, use an APP SETTINGS service */
                    this.PARKING_TYPE_FREE = 1;
                    this.PARKING_TYPE_PAID = 2;
                    this.PARKING_TYPE_NO_PARKING = 3;
                    this.PARKING_TYPE_PERMIT = 4;
                }
                init(map) { this.map = map; }
                renderSectionsForView(sectionsArray) {
                    for (var i = 0; i < sectionsArray.length; i++) {
                        var sectionPoints = google.maps.geometry.encoding.decodePath(sectionsArray[i].polyline);
                        this.drawSection(sectionPoints, sectionsArray[i].street_side, this.getTypeColor(sectionsArray[i]));
                    }
                }
                drawSection(sectionPoints, streetSide, color) {
                    let formPoly;
                    let svgPath = "";
                    if (streetSide != 0) {
                        if (streetSide > 0)
                            svgPath = 'M 2 0 L 3 0 L 3 1 L 2 1 2 0'; //pts are y x
                        else
                            svgPath = 'M -1 0 L -2 0 L -2 1 L -1 1 -1 0';
                        /*
                        if(streetSide > 0)
                            svgPath = 'M 0 0 L -4 -2 L 0 -4 0 0'; neg wrong, switch
                        else
                            svgPath = 'M 0 0 L 4 2 L 0 4 0 0';
                        if(streetSide > 0)
                            svgPath = 'M -2 0 L -2 4 L -5 4 L -5 0 -2 0'; //pts are y x
                        else
                            svgPath = 'M 2 0 L 2 4 L 5 4 L 5 0 2 0';
                        if(streetSide > 0)
                            svgPath = 'M 1 0 L 1 2 L 0 2 L 0 0 1 0'; //pts are y x
                        else
                            svgPath = 'M -1 0 L -1 2 L 0 2 L 0 0 -1 0';
                        if(streetSide > 0)
                            svgPath = 'M 0 0 L 2 0 L 2 6 L 0 6 0 0'; //pts are y x
                        else
                            svgPath = 'M 0 6 L 0 12 L -2 12 L -2 6 0 6';
                        if(streetSide > 0)
                            svgPath = 'M 1 0 L 3 2 L 1 4 1 0'; //pts are y x
                        else
                            svgPath = 'M -1 0 L -3 2 L -1 4 -1 0';
                        */
                        formPoly = new google.maps.Polyline({
                            path: sectionPoints,
                            strokeColor: color,
                            strokeOpacity: 0,
                            strokeWeight: 1,
                            icons: [{
                                    icon: {
                                        path: svgPath,
                                        strokeColor: color,
                                        strokeOpacity: 1.0,
                                        fillColor: color,
                                        fillOpacity: .5,
                                        strokeWeight: 1
                                    },
                                    repeat: '2px'
                                }]
                        });
                    }
                    else {
                        //alert(polyLine);return;
                        formPoly = new google.maps.Polyline({
                            path: sectionPoints,
                            strokeColor: color,
                            strokeOpacity: 1,
                            strokeWeight: 2
                        });
                    }
                    formPoly.setMap(this.map);
                    return formPoly; // for reference, to set null at a later point
                }
                getTypeColor(section) {
                    if (section.main_parking_type_id == this.PARKING_TYPE_FREE && section.is_hours_restricted == 0 && !section.main_short_term_min)
                        return '#00ff00';
                    if (section.main_parking_type_id == this.PARKING_TYPE_NO_PARKING)
                        return '#ff0000';
                    if (section.main_parking_type_id == this.PARKING_TYPE_PAID && section.is_hours_restricted == 0)
                        return '#ffff00';
                    if (section.main_parking_type_id == this.PARKING_TYPE_PAID)
                        return '#ffa500';
                    if (section.main_parking_type_id == this.PARKING_TYPE_PERMIT)
                        return '#993366';
                    if (section.main_parking_type_id == this.PARKING_TYPE_FREE && section.is_hours_restricted)
                        return '#0000ff';
                    else
                        return '#000000';
                }
            };
            SectionRendererService = __decorate([
                // TODO:NW get types?? typings install google.maps --global
                core_1.Injectable(), 
                __metadata('design:paramtypes', [])
            ], SectionRendererService);
            exports_1("SectionRendererService", SectionRendererService);
        }
    }
});
