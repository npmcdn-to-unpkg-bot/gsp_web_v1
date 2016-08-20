System.register(['@angular/core', './map-section', './name-for-p-type-id.pipe', './app-settings'], function(exports_1, context_1) {
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
    var core_1, map_section_1, name_for_p_type_id_pipe_1, app_settings_1;
    var SectionInfoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (map_section_1_1) {
                map_section_1 = map_section_1_1;
            },
            function (name_for_p_type_id_pipe_1_1) {
                name_for_p_type_id_pipe_1 = name_for_p_type_id_pipe_1_1;
            },
            function (app_settings_1_1) {
                app_settings_1 = app_settings_1_1;
            }],
        execute: function() {
            let SectionInfoComponent = class SectionInfoComponent {
                constructor() {
                    this.hoursHtml = 'None';
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', map_section_1.MapSection)
            ], SectionInfoComponent.prototype, "model", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], SectionInfoComponent.prototype, "hoursHtml", void 0);
            SectionInfoComponent = __decorate([
                core_1.Component({
                    selector: 'section-info',
                    templateUrl: app_settings_1.AppSettings.APP_RELATIVE_URL + '/app/templates/section-info.component.html',
                    pipes: [name_for_p_type_id_pipe_1.NameForPtypeIdPipe]
                }), 
                __metadata('design:paramtypes', [])
            ], SectionInfoComponent);
            exports_1("SectionInfoComponent", SectionInfoComponent);
        }
    }
});
