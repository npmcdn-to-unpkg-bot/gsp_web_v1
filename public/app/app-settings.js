System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AppSettings;
    return {
        setters:[],
        execute: function() {
            class AppSettings {
                // TODO:NW get from server. Figure out why static properties cannot be referenced here
                static get PARKING_TYPES() {
                    let typeObj = {};
                    typeObj[AppSettings.PARKING_TYPE_FREE] = { id: AppSettings.PARKING_TYPE_FREE, name: 'Free' };
                    typeObj[AppSettings.PARKING_TYPE_PAID] = { id: AppSettings.PARKING_TYPE_PAID, name: 'Paid' };
                    typeObj[AppSettings.PARKING_TYPE_NO_PARKING] = { id: AppSettings.PARKING_TYPE_NO_PARKING, name: 'No parking' };
                    typeObj[AppSettings.PARKING_TYPE_PERMIT] = { id: AppSettings.PARKING_TYPE_PERMIT, name: 'Permit required' };
                    return typeObj;
                }
                static getTypeColor(section) {
                    if (section.mainParkingTypeId == AppSettings.PARKING_TYPE_FREE && section.isHoursRestricted == 0 && !section.mainShortTermMin)
                        return '#00ff00';
                    if (section.mainParkingTypeId == AppSettings.PARKING_TYPE_NO_PARKING)
                        return '#ff0000';
                    if (section.mainParkingTypeId == AppSettings.PARKING_TYPE_PAID && section.isHoursRestricted == 0)
                        return '#ffff00';
                    if (section.mainParkingTypeId == AppSettings.PARKING_TYPE_PAID)
                        return '#ffa500';
                    if (section.mainParkingTypeId == AppSettings.PARKING_TYPE_PERMIT)
                        return '#993366';
                    if (section.mainParkingTypeId == AppSettings.PARKING_TYPE_FREE && section.isHoursRestricted)
                        return '#0000ff';
                    else
                        return '#000000';
                }
            }
            //public static get API_ENDPOINT(): string { return 'http://127.0.0.1:6666/api/'; }
            AppSettings.PARKING_TYPE_FREE = 1;
            AppSettings.PARKING_TYPE_PAID = 2;
            AppSettings.PARKING_TYPE_NO_PARKING = 3;
            AppSettings.PARKING_TYPE_PERMIT = 4;
            exports_1("AppSettings", AppSettings);
        }
    }
});
