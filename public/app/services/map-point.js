System.register(['@angular/core', '@angular/http', 'rxjs/add/operator/toPromise', '../app-settings'], function(exports_1, context_1) {
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
    var core_1, http_1, app_settings_1;
    var MapPointService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (app_settings_1_1) {
                app_settings_1 = app_settings_1_1;
            }],
        execute: function() {
            let MapPointService = class MapPointService {
                constructor(http) {
                    this.http = http;
                    this.gspApiUrl = app_settings_1.AppSettings.APP_URL + '/mapPoint'; // URL to web api
                }
                loadPointsForMap(mapData) {
                    //let url = `${this.heroesUrl}/${hero.id}`;
                    let url = this.gspApiUrl + '/loadPointsForMap';
                    // TODO:NW make api  in laravel with support for json packaged data
                    //let headers = new Headers({'Content-Type': 'application/json'});
                    // temporary 
                    let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
                    let transformRequest = function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    };
                    // JSON.stringify(hero)
                    // return this.http.post(url, JSON.stringify(mapData), {headers: headers})
                    return this.http.post(url, transformRequest(mapData), { headers: headers })
                        .toPromise()
                        .then(response => response.json().points)
                        .catch(this.handleError);
                }
                saveMapPoint(point) {
                    let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    let body = JSON.stringify(point);
                    return this.http.put(this.gspApiUrl + '/' + point.id, body, headers)
                        .toPromise()
                        .then(response => response.json().section)
                        .catch(this.handleError);
                }
                deleteMapPoint(pointId) {
                    return this.http.delete(this.gspApiUrl + '/' + pointId)
                        .toPromise()
                        .then(response => response)
                        .catch(this.handleError);
                }
                handleError(error) {
                    console.error('An error occurred', error);
                    // debugger;
                    return Promise.reject(error.message || error);
                }
            };
            MapPointService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http])
            ], MapPointService);
            exports_1("MapPointService", MapPointService);
        }
    }
});
