import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MapPoint } from '../models/map-point';
import { AppSettings } from '../app-settings'

@Injectable()
export class MapPointService {

  private gspApiUrl = AppSettings.APP_URL + '/mapPoint';  // URL to web api

  constructor(private http: Http) { }

  loadPointsForMap(mapData: Object){

    //let url = `${this.heroesUrl}/${hero.id}`;
    let url = this.gspApiUrl + '/loadPointsForMap';
    // TODO:NW make api  in laravel with support for json packaged data
    //let headers = new Headers({'Content-Type': 'application/json'});
    
    // temporary 
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let transformRequest = function(obj) {
        var str = [];
        for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };

    // JSON.stringify(hero)
    // return this.http.post(url, JSON.stringify(mapData), {headers: headers})

    return this.http.post(url, transformRequest(mapData), {headers: headers})
     .toPromise()
     .then(response => response.json().sections)
     .catch(this.handleError);
  }

  saveMapPoint(point:MapPoint){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = JSON.stringify(point);
    return this.http.put(this.gspApiUrl + '/' + point.id, body, headers)
     .toPromise()
     .then(response => response.json().section)
     //.then(function(response){ debugger; })
     .catch(this.handleError);
  }

  deleteMapPoint(pointId:number){
    return this.http.delete(this.gspApiUrl + '/' + pointId)
     .toPromise()
     .then(response => response)
     //.then(function(response){ debugger; })
     .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    // debugger;
    return Promise.reject(error.message || error);
  }
}