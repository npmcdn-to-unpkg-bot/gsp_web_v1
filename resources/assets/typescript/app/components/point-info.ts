import { Component, Input } from '@angular/core';
import { MapSection } from '../models/map-section';
import { MapPoint } from '../models/map-point';
import { AppSettings } from '../app-settings';

@Component({
  selector: 'point-info',
  templateUrl:  AppSettings.APP_RELATIVE_URL + '/app/templates/point-info.html',
  // pipes : [ NameForPtypeIdPipe ]
})

export class PointInfoComponent { 
  @Input() model: MapPoint;
  // @Input() hoursHtml: string = 'None';
}