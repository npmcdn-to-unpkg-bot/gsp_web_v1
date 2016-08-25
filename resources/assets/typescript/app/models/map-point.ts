import { AppSettings } from '../app-settings';

export class MapPoint {
  
  constructor(
    public id: number
  ) {  }

  streetSide: number;
  mainParkingTypeId: number;
  numSpots: number;
  mainPph:number;
  mainShortTermMin: number;
  isHoursRestricted: number;  
  hoursType:string; // only client side for now
  hoursData: string;
  notes: string;
  availabilityRating: number;
  lat:number;
  lng:number;
  
  // 'submittedBy',
  // 'approved',
  // 'updatedAt',
  // 'createdAt'

  // client side generated variables
  // hoursHtml:string;

  // TODO:NW get from server. Figure out why static properties cannot be referenced here
 public static get POINT_TYPES(): Object { 
   let typeObj={};
   typeObj[AppSettings.POINT_TYPE_MC] = {id:AppSettings.POINT_TYPE_MC, name:'Motorcyle'};
   typeObj[AppSettings.POINT_TYPE_HC] = {id:AppSettings.POINT_TYPE_HC, name:'Handicap'};
   typeObj[AppSettings.POINT_TYPE_LOADING] = {id:AppSettings.POINT_TYPE_LOADING, name:'Loading'};
   typeObj[AppSettings.POINT_TYPE_ELEC] = {id:AppSettings.POINT_TYPE_ELEC, name:'Electric Vehicle'};
   typeObj[AppSettings.POINT_TYPE_FREIGHT] = {id:AppSettings.POINT_TYPE_FREIGHT, name:'Freight'};
   typeObj[AppSettings.POINT_TYPE_MISC] = {id:AppSettings.POINT_TYPE_MISC, name:'Miscellaneous'};
   return typeObj;
 }

 public static getTypeIcon(point:MapPoint){
   /*
    if(section.mainParkingTypeId == AppSettings.POINT_TYPE_FREE && section.isHoursRestricted == 0 && (!section.mainShortTermMin ||  section.mainShortTermMin == 0))
        return '#00ff00';
    if(section.mainParkingTypeId == AppSettings.POINT_TYPE_NO_PARKING)
        return '#ff0000';
    if(section.mainParkingTypeId == AppSettings.POINT_TYPE_PAID && section.isHoursRestricted == 0)
        return '#ffff00';
    if(section.mainParkingTypeId == AppSettings.POINT_TYPE_PAID)
        return '#ffa500';
    if(section.mainParkingTypeId == AppSettings.POINT_TYPE_PERMIT)
        return '#993366';
    if(section.mainParkingTypeId == AppSettings.POINT_TYPE_FREE && section.isHoursRestricted == 1)
        return '#0000ff';
    if(section.mainParkingTypeId == AppSettings.POINT_TYPE_FREE && section.mainShortTermMin)
        return '#0000ff';
    else
        return '#000000';
      */
  }

}