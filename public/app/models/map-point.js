System.register(['../app-settings'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_settings_1;
    var MapPoint;
    return {
        setters:[
            function (app_settings_1_1) {
                app_settings_1 = app_settings_1_1;
            }],
        execute: function() {
            class MapPoint {
                constructor(id) {
                    this.id = id;
                }
                // 'submittedBy',
                // 'approved',
                // 'updatedAt',
                // 'createdAt'
                // client side generated variables
                // hoursHtml:string;
                // TODO:NW get from server. Figure out why static properties cannot be referenced here
                static get POINT_TYPES() {
                    let typeObj = {};
                    typeObj[app_settings_1.AppSettings.POINT_TYPE_MC] = { id: app_settings_1.AppSettings.POINT_TYPE_MC, name: 'Motorcyle' };
                    typeObj[app_settings_1.AppSettings.POINT_TYPE_HC] = { id: app_settings_1.AppSettings.POINT_TYPE_HC, name: 'Handicap' };
                    typeObj[app_settings_1.AppSettings.POINT_TYPE_LOADING] = { id: app_settings_1.AppSettings.POINT_TYPE_LOADING, name: 'Loading' };
                    typeObj[app_settings_1.AppSettings.POINT_TYPE_ELEC] = { id: app_settings_1.AppSettings.POINT_TYPE_ELEC, name: 'Electric Vehicle' };
                    typeObj[app_settings_1.AppSettings.POINT_TYPE_FREIGHT] = { id: app_settings_1.AppSettings.POINT_TYPE_FREIGHT, name: 'Freight' };
                    typeObj[app_settings_1.AppSettings.POINT_TYPE_MISC] = { id: app_settings_1.AppSettings.POINT_TYPE_MISC, name: 'Miscellaneous' };
                    return typeObj;
                }
                static getTypeIcon(point) {
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
            exports_1("MapPoint", MapPoint);
        }
    }
});
