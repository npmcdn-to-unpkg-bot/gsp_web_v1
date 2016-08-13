import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MapSection } from './map-section';

@Injectable()
export class MapSectionService {

  private gspApiUrl = 'http://n8williams.com/gmap_st_parking/mapSection/loadSectionsForMap';  // URL to web api

  constructor(private http: Http) { }

  loadSectionsForMap(mapData: Object){

    //let url = `${this.heroesUrl}/${hero.id}`;
    let url = `${this.gspApiUrl}`;
    // TODO:NW make api  in laravel with support fir json packaged data
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
     .then(response => response.json().sections as MapSection[])
     .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}