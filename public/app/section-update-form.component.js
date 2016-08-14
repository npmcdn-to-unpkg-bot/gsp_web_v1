System.register(['@angular/core', './map-section', './app-settings'], function(exports_1, context_1) {
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
    var core_1, map_section_1, app_settings_1;
    var SectionUpdateFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (map_section_1_1) {
                map_section_1 = map_section_1_1;
            },
            function (app_settings_1_1) {
                app_settings_1 = app_settings_1_1;
            }],
        execute: function() {
            //import { NameForPtypeIdPipe } from './name-for-p-type-id.pipe'; // import pipe here
            let SectionUpdateFormComponent = class SectionUpdateFormComponent {
                constructor() {
                    this.pTypes = [];
                    this.times = [5, 10, 15, , 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480];
                    //model = new MapSection(1); // set from parent on selection
                    this.submitted = false;
                    // Reset the form with a new hero AND restore 'pristine' class state
                    // by toggling 'active' flag which causes the form
                    // to be removed/re-added in a tick via NgIf
                    // TODO: Workaround until NgForm has a reset method (#6822)
                    this.active = true;
                }
                ngOnInit() {
                    let ptDef = app_settings_1.AppSettings.PARKING_TYPES;
                    for (var ptId in ptDef) {
                        this.pTypes.push(ptDef[ptId]);
                    }
                    // make sure string representations of numbers are converted ??
                    // var test = Number(this.model.mainParkingTypeId);
                    // this.model.mainParkingTypeId = Number(this.model.mainParkingTypeId);
                }
                onSubmit() { this.submitted = true; }
                newSection() {
                    this.model = new map_section_1.MapSection(-1);
                    this.active = false;
                    setTimeout(() => this.active = true, 0);
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', map_section_1.MapSection)
            ], SectionUpdateFormComponent.prototype, "model", void 0);
            SectionUpdateFormComponent = __decorate([
                core_1.Component({
                    selector: 'section-update-form',
                    templateUrl: './app/templates/section-update-form.component.html'
                }), 
                __metadata('design:paramtypes', [])
            ], SectionUpdateFormComponent);
            exports_1("SectionUpdateFormComponent", SectionUpdateFormComponent);
        }
    }
});
