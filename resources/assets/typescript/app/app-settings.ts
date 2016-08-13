import { MapSection } from './map-section';

export class AppSettings {
   //public static get API_ENDPOINT(): string { return 'http://127.0.0.1:6666/api/'; }

   public static PARKING_TYPE_FREE:number = 1;
   public static PARKING_TYPE_PAID:number = 2;
   public static PARKING_TYPE_NO_PARKING:number = 3;
   public static PARKING_TYPE_PERMIT:number = 4;

   // TODO:NW get from server
   public static get PARKING_TYPES(): Object[] { 
     return [
       {id:AppSettings.PARKING_TYPE_FREE, name:'Free'},
       {id:AppSettings.PARKING_TYPE_PAID, name:'Paid'},
       {id:AppSettings.PARKING_TYPE_NO_PARKING, name:'No parking'},
       {id:AppSettings.PARKING_TYPE_PERMIT, name:'Permit required'}
     ];
   }

   public getTypeColor(section:MapSection){
      if(section.main_parking_type_id == AppSettings.PARKING_TYPE_FREE && section.is_hours_restricted == 0 && !section.main_short_term_min)
          return '#00ff00';
      if(section.main_parking_type_id == AppSettings.PARKING_TYPE_NO_PARKING)
          return '#ff0000';
      if(section.main_parking_type_id == AppSettings.PARKING_TYPE_PAID && section.is_hours_restricted == 0)
          return '#ffff00';
      if(section.main_parking_type_id == AppSettings.PARKING_TYPE_PAID)
          return '#ffa500';
      if(section.main_parking_type_id == AppSettings.PARKING_TYPE_PERMIT)
          return '#993366';
      if(section.main_parking_type_id == AppSettings.PARKING_TYPE_FREE && section.is_hours_restricted)
          return '#0000ff';
      else
          return '#000000';
  }
}