System.register(['@angular/core', './map-section', './name-for-p-type-id.pipe'], function(exports_1, context_1) {
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
    var core_1, map_section_1, name_for_p_type_id_pipe_1;
    var SectionUpdateFormComponent;
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
            }],
        execute: function() {
            let SectionUpdateFormComponent = class SectionUpdateFormComponent {
                constructor() {
                    this.ptIds = [1, 2, 3, 4];
                    this.times = [5, 10, 15, , 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480];
                    //model = new MapSection(1); // set from parent on selection
                    this.submitted = false;
                    // Reset the form with a new hero AND restore 'pristine' class state
                    // by toggling 'active' flag which causes the form
                    // to be removed/re-added in a tick via NgIf
                    // TODO: Workaround until NgForm has a reset method (#6822)
                    this.active = true;
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
                // import pipe here
                core_1.Component({
                    selector: 'section-update-form',
                    templateUrl: './app/templates/section-update-form.component.html',
                    pipes: [name_for_p_type_id_pipe_1.NameForPtypeIdPipe]
                }), 
                __metadata('design:paramtypes', [])
            ], SectionUpdateFormComponent);
            exports_1("SectionUpdateFormComponent", SectionUpdateFormComponent);
        }
    }
});
