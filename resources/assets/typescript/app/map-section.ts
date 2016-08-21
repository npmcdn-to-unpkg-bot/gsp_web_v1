import { HoursFormatter } from './helpers/hours-formatter';
import { AppSettings } from './app-settings';

export class MapSection {
  
  constructor(
    public id: number
  ) {  }

  hoursPph:number;
  polyline: string;
  startLat:number;
  endLat:number;
  startLng:number;
  endLng:number;
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

  // TODO:NW get from server. Figure out why static properties cannot be referenced here
 public static get PARKING_TYPES(): Object { 
   let typeObj={};
   typeObj[AppSettings.PARKING_TYPE_FREE] = {id:AppSettings.PARKING_TYPE_FREE, name:'Free'};
   typeObj[AppSettings.PARKING_TYPE_PAID] = {id:AppSettings.PARKING_TYPE_PAID, name:'Paid'};
   typeObj[AppSettings.PARKING_TYPE_NO_PARKING] = {id:AppSettings.PARKING_TYPE_NO_PARKING, name:'No parking'};
   typeObj[AppSettings.PARKING_TYPE_PERMIT] = {id:AppSettings.PARKING_TYPE_PERMIT, name:'Permit required'};
   return typeObj;
 }

 public static getTypeColor(section:MapSection){
    if(section.mainParkingTypeId == AppSettings.PARKING_TYPE_FREE && section.isHoursRestricted == 0 && (!section.mainShortTermMin ||  section.mainShortTermMin == 0))
        return '#00ff00';
    if(section.mainParkingTypeId == AppSettings.PARKING_TYPE_NO_PARKING)
        return '#ff0000';
    if(section.mainParkingTypeId == AppSettings.PARKING_TYPE_PAID && section.isHoursRestricted == 0)
        return '#ffff00';
    if(section.mainParkingTypeId == AppSettings.PARKING_TYPE_PAID)
        return '#ffa500';
    if(section.mainParkingTypeId == AppSettings.PARKING_TYPE_PERMIT)
        return '#993366';
    if(section.mainParkingTypeId == AppSettings.PARKING_TYPE_FREE && section.isHoursRestricted == 1)
        return '#0000ff';
    if(section.mainParkingTypeId == AppSettings.PARKING_TYPE_FREE && section.mainShortTermMin)
        return '#0000ff';
    else
        return '#000000';
  }

  updateHoursHtml():void{
     let hf = new HoursFormatter();
     this.hoursHtml = hf.hoursTable(this);
  }

}