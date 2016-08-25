System.register(['@angular/core', '@angular/platform-browser', '@angular/http', '@angular/forms', './app.component', './components/main-map', './components/left-map-legend', './components/modal-container', './components/section-update-form', './components/section-info'], function(exports_1, context_1) {
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
    var core_1, platform_browser_1, http_1, forms_1, app_component_1, main_map_1, left_map_legend_1, modal_container_1, section_update_form_1, section_info_1;
    var AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (main_map_1_1) {
                main_map_1 = main_map_1_1;
            },
            function (left_map_legend_1_1) {
                left_map_legend_1 = left_map_legend_1_1;
            },
            function (modal_container_1_1) {
                modal_container_1 = modal_container_1_1;
            },
            function (section_update_form_1_1) {
                section_update_form_1 = section_update_form_1_1;
            },
            function (section_info_1_1) {
                section_info_1 = section_info_1_1;
            }],
        execute: function() {
            let AppModule = class AppModule {
            };
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule],
                    declarations: [
                        app_component_1.AppComponent,
                        main_map_1.MapComponent,
                        left_map_legend_1.LeftMapLegendComponent,
                        modal_container_1.ModalContainerComponent,
                        section_update_form_1.SectionUpdateFormComponent,
                        section_info_1.SectionInfoComponent
                    ],
                    bootstrap: [app_component_1.AppComponent]
                }), 
                __metadata('design:paramtypes', [])
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    }
});
