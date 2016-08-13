import { Pipe, PipeTransform } from '@angular/core';
import { AppSettings } from './app-settings';

@Pipe({name: 'nameForPtypeId'})
export class NameForPtypeIdPipe implements PipeTransform {
  transform(id: number): string {
    return AppSettings.PARKING_TYPES[id].name
  }
}