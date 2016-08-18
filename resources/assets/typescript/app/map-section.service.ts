import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MapSection } from './map-section';
import { AppSettings } from './app-settings'

@Injectable()
export class MapSectionService {

  // TODO:NW env this somehow
  //private gspApiUrl = 'http://n8williams.com/gmap_st_parking/mapSection/loadSectionsForMap';  // URL to web api
  private gspApiUrl = AppSettings.APP_URL + '/mapSection';  // URL to web api

  constructor(private http: Http) { }

  loadSectionsForMap(mapData: Object){

    //let url = `${this.heroesUrl}/${hero.id}`;
    let url = this.gspApiUrl + '/loadSectionsForMap';
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

  saveMapSection(section:MapSection){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = JSON.stringify(section);
    return this.http.put(this.gspApiUrl + '/' + section.id, body, headers)
     .toPromise()
     .then(response => response.json().section)
     //.then(function(response){ debugger; })
     .catch(this.handleError);
  }

  deleteMapSection(sectionId:number){
    return this.http.delete(this.gspApiUrl + '/destroy/' + sectionId);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    // debugger;
    return Promise.reject(error.message || error);
  }
}