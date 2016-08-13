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
    var ModalContainerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            // import { SectionUpdateFormComponent } from './section-update-form.component';
            let ModalContainerComponent = class ModalContainerComponent {
                constructor() {
                    this.contentString = 'beginDummyData';
                    this.contentType = 'simple_string';
                }
                showModalContainer(title) {
                    this.title = title;
                    this.myModalIsVisible = true;
                }
                hideModalContainer() {
                    this.myModalIsVisible = false;
                }
                ngOnChanges(changes) {
                    /*
                    for (let propName in changes) {
                      let changedProp = changes[propName];
                      let from = JSON.stringify(changedProp.previousValue);
                      let to =   JSON.stringify(changedProp.currentValue);
                      this.myModalIsVisible=!this.myModalIsVisible;
                      debugger;
                      // log.push( `${propName} changed from ${from} to ${to}`);
                    }
                    */
                }
                // WTF, this is triggered on the value change in parent, but not ngOnChanges
                ngDoCheck() {
                    this.myModalIsVisible = this.myModalIsVisible;
                    //debugger;  
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], ModalContainerComponent.prototype, "title", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Boolean)
            ], ModalContainerComponent.prototype, "myModalIsVisible", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], ModalContainerComponent.prototype, "contentString", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], ModalContainerComponent.prototype, "contentType", void 0);
            ModalContainerComponent = __decorate([
                core_1.Component({
                    selector: 'modal-container',
                    templateUrl: './app/modal-container.component.html',
                }), 
                __metadata('design:paramtypes', [])
            ], ModalContainerComponent);
            exports_1("ModalContainerComponent", ModalContainerComponent);
        }
    }
});