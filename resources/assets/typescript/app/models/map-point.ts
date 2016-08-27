import { AppSettings } from '../app-settings';

export class MapPoint {
  
  constructor(public id: number) {  
    this.approved=1;
  }

  pointTypeId: number;
  //streetSide: number;
  mainParkingTypeId: number;
  numSpots: number;
  mainPph:number;
  mainShortTermMin: number;
  isHoursRestricted: number;
  hoursData: string;
  notes: string;
  availabilityRating: number;
  lat:number;
  lng:number;
  approved:number;
  
  // 'submittedBy',
  // 'updatedAt',
  // 'createdAt'

  // client side generated variables
  // hoursHtml:string;
  hoursType:string; // only client side for now

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
   
    if(point.pointTypeId == AppSettings.POINT_TYPE_MC) return 'mc-icon.png';
    if(point.pointTypeId == AppSettings.POINT_TYPE_HC) return 'hc-icon.png';
    if(point.pointTypeId == AppSettings.POINT_TYPE_LOADING) return 'loading-icon.png';
    if(point.pointTypeId == AppSettings.POINT_TYPE_ELEC) return 'elec-icon.png';
    if(point.pointTypeId == AppSettings.POINT_TYPE_FREIGHT) return 'freight-icon.png';
    if(point.pointTypeId == AppSettings.POINT_TYPE_MISC) return 'misc-icon.png';
    return '';
  }

}