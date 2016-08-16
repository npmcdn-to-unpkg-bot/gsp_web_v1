import { HoursFormatter } from './helpers/hours-formatter';

export class MapSection {
  
  constructor(
    public id: number
  ) {  }

  hoursPph:number;
  polyline: string;
  mainParkingTypeId: number;
  streetSide: number;
  isHoursRestricted: number; // TODO:NW convert to boolean?
  mainShortTermMin: number;
  mainPph:number;
  notes: string;
  hoursData: string;

  // client side generated variables
  hoursHtml:string;
  newPolyline:boolean;

  updateHoursHtml():void{
     let hf = new HoursFormatter();
     this.hoursHtml = hf.hoursTable(this);
  }

}