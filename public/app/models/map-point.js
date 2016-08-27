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
                    this.approved = 1;
                }
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
                    if (point.pointTypeId == app_settings_1.AppSettings.POINT_TYPE_MC)
                        return 'mc-icon.png';
                    if (point.pointTypeId == app_settings_1.AppSettings.POINT_TYPE_HC)
                        return 'hc-icon.png';
                    if (point.pointTypeId == app_settings_1.AppSettings.POINT_TYPE_LOADING)
                        return 'loading-icon.png';
                    if (point.pointTypeId == app_settings_1.AppSettings.POINT_TYPE_ELEC)
                        return 'elec-icon.png';
                    if (point.pointTypeId == app_settings_1.AppSettings.POINT_TYPE_FREIGHT)
                        return 'freight-icon.png';
                    if (point.pointTypeId == app_settings_1.AppSettings.POINT_TYPE_MISC)
                        return 'misc-icon.png';
                    return '';
                }
            }
            exports_1("MapPoint", MapPoint);
        }
    }
});
