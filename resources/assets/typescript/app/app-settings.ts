// TODO: Maybe figure out a diff env method for this, for now take from 
// the env.js included in layouts/views that use it
declare var GSP_APP_URL: any;
declare var GSP_APP_RELATIVE_URL: any;

export class AppSettings {
   //public static get API_ENDPOINT(): string { return 'http://127.0.0.1:6666/api/'; }

   public static PARKING_TYPE_FREE:number = 1;
   public static PARKING_TYPE_PAID:number = 2;
   public static PARKING_TYPE_NO_PARKING:number = 3;
   public static PARKING_TYPE_PERMIT:number = 4;

   public static POINT_TYPE_MC:number = 1;
   public static POINT_TYPE_HC:number = 2;
   public static POINT_TYPE_LOADING:number = 3;
   public static POINT_TYPE_ELEC:number = 4;
   public static POINT_TYPE_FREIGHT:number = 5;
   public static POINT_TYPE_MISC:number = 6;

   public static APP_URL:string = GSP_APP_URL;
   public static APP_RELATIVE_URL:string = GSP_APP_RELATIVE_URL;


}