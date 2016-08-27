System.register(['@angular/core', '../models/map-point', '../models/map-section', '../models/section-hours', '../app-settings', '../services/map-point', '../services/form-markers'], function(exports_1, context_1) {
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
    var core_1, map_point_1, map_section_1, section_hours_1, app_settings_1, map_point_2, form_markers_1;
    var PointUpdateFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (map_point_1_1) {
                map_point_1 = map_point_1_1;
            },
            function (map_section_1_1) {
                map_section_1 = map_section_1_1;
            },
            function (section_hours_1_1) {
                section_hours_1 = section_hours_1_1;
            },
            function (app_settings_1_1) {
                app_settings_1 = app_settings_1_1;
            },
            function (map_point_2_1) {
                map_point_2 = map_point_2_1;
            },
            function (form_markers_1_1) {
                form_markers_1 = form_markers_1_1;
            }],
        execute: function() {
            //import { NameForPtypeIdPipe } from './name-for-p-type-id.pipe'; // import pipe here
            let PointUpdateFormComponent = class PointUpdateFormComponent {
                constructor(mapPointService, formMarkerService) {
                    this.mapPointService = mapPointService;
                    this.formMarkerService = formMarkerService;
                    this.onDeleteComplete = new core_1.EventEmitter();
                    this.pTimes = [];
                    this.pkTypes = [];
                    this.ptTypes = [];
                    this.hoursTypes = [];
                    //model = new MapSection(1); // set from parent on selection
                    this.submitted = false;
                    // Reset the form with a new hero AND restore 'pristine' class state
                    // by toggling 'active' flag which causes the form
                    // to be removed/re-added in a tick via NgIf
                    // TODO: Workaround until NgForm has a reset method (#6822)
                    this.active = true;
                }
                // don't set model.newPolyline here, onInit is called after the form model has already been set
                // @see formMarkers.showFormLink()
                // TODO:NW understand how to avoid the problem: if model for this form is set by something else
                // then when this is rendered (after the data model has been set) the ngOnInit will overwrite
                // Use constructor instead of ngOnInit? Use event queue? 
                ngOnInit() {
                    let pkDef = map_section_1.MapSection.PARKING_TYPES;
                    for (var ptId in pkDef) {
                        this.pkTypes.push(pkDef[ptId]);
                    }
                    let ptDef = map_point_1.MapPoint.POINT_TYPES;
                    for (var ptId in ptDef) {
                        this.ptTypes.push(ptDef[ptId]);
                    }
                    let times = [0, 5, 10, 15, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480];
                    for (let t of times) {
                        let timeString = this.labelForTime(t);
                        this.pTimes.push({ time: t, label: timeString });
                    }
                    this.hoursTypes = section_hours_1.SectionHours.getTypes();
                }
                labelForTime(t) {
                    if (t == 0) {
                        return '';
                    }
                    else if (t == 5) {
                        return '5 min';
                    }
                    else if (t == 10) {
                        return '10 min';
                    }
                    else if (t == 15) {
                        return '15 min';
                    }
                    else if (t == 30) {
                        return '30 min';
                    }
                    else {
                        return t / 60 + ' hrs';
                    }
                }
                onSubmit() {
                    this.submitted = true;
                    this.model.lat = this.formMarkerService.mark1.position.lat();
                    this.model.lng = this.formMarkerService.mark1.position.lng();
                    this.mapPointService.saveMapPoint(this.model).then(function (response) {
                        // for now we don't need the new id or anything from the response
                    });
                }
                deletePoint() {
                    this.submitted = true;
                    let self = this;
                    this.mapPointService.deleteMapPoint(this.model.id).then(function (response) {
                        // for now we don't need the new id or anything from the response
                        let testMessage = 'hi';
                        self.onDeleteComplete.emit(testMessage);
                    });
                }
                showNewPoint() {
                    this.model = new map_point_1.MapPoint(-1);
                    this.active = false;
                    setTimeout(() => this.active = true, 0);
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', map_point_1.MapPoint)
            ], PointUpdateFormComponent.prototype, "model", void 0);
            __decorate([
                core_1.Output(), 
                __metadata('design:type', Object)
            ], PointUpdateFormComponent.prototype, "onDeleteComplete", void 0);
            PointUpdateFormComponent = __decorate([
                core_1.Component({
                    selector: 'point-update-form',
                    templateUrl: app_settings_1.AppSettings.APP_RELATIVE_URL + '/app/templates/point-update-form.html',
                    providers: [map_point_2.MapPointService]
                }), 
                __metadata('design:paramtypes', [map_point_2.MapPointService, form_markers_1.FormMarkers])
            ], PointUpdateFormComponent);
            exports_1("PointUpdateFormComponent", PointUpdateFormComponent);
        }
    }
});
