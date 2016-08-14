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
                drawSection(sectionPoints, streetSide, color, map) {
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
                    formPoly.setMap(map);
                    return formPoly;
                }
                drawSectionInfoMarker(section, map) {
                    var sectionPoints = google.maps.geometry.encoding.decodePath(section.polyline);
                    var shift = .0002; //world x/y units
                    var proj = map.getProjection();
                    //get the middle section of the polyline, round up to more beginning section
                    var midIndex = Math.floor(sectionPoints.length / 2);
                    var p1 = proj.fromLatLngToPoint(sectionPoints[midIndex]);
                    var p2 = proj.fromLatLngToPoint(sectionPoints[midIndex - 1]);
                    //get the midpoint of the segment
                    var pfx = (p1.x + p2.x) / 2;
                    var pfy = (p1.y + p2.y) / 2;
                    //alert(pfx);alert(pfy);
                    //compute shift, always shift positive one way, or negative the other
                    var dx = 0;
                    var dy = 0;
                    //angle of the line segment in radians, y is opp in world coords, and using delta
                    var theta = Math.atan2(p2.y - p1.y, p2.x - p1.x);
                    if (section.streetSide == 0) {
                    }
                    else {
                        // from the two points figure out the direction of the line. 
                        // streetSide = direction of y coord from origin, draw the marker on this side
                        // in maps positive y is down
                        var deltay = p1.x - p2.x;
                        var deltax = p1.y - p2.y;
                        dx = shift * Math.sin(theta) * section.streetSide;
                        dy = shift * Math.cos(theta) * -1 * section.streetSide; //y in maps goes the opposite way
                    }
                    //set the new point
                    var iconPoint = new google.maps.Point(pfx + dx, pfy + dy);
                    //draw an icon that far out from the midpoint
                    var pixelLatLng = proj.fromPointToLatLng(iconPoint);
                    var marker = new google.maps.Marker({
                        position: pixelLatLng,
                        map: map,
                        icon: '/images/i-icon.png',
                        title: 'a title'
                    });
                    var self = this;
                    return marker;
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
