import { Pipe, PipeTransform } from '@angular/core';
import { MapSection } from './models/map-section';

@Pipe({name: 'nameForPtypeId'})
export class NameForPtypeIdPipe implements PipeTransform {
  transform(id: number): string {
    if(!id) return '';
    return MapSection.PARKING_TYPES[id].name
  }
}