// import { AppSettings } from './app-settings';

export class MapSection {
  
  constructor(
    public id: number
  ) {  }

  polyline: string;
  mainParkingTypeId: number;
  streetSide: number;
  isHoursRestricted: number; // TODO:NW convert to boolean?
  mainShortTermMin: number;
  notes: string;

  // public static getNameForTypeId(id:number){return AppSettings.PARKING_TYPES[id].name}

}