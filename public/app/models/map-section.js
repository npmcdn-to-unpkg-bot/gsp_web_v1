System.register(['../helpers/hours-formatter', '../app-settings'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var hours_formatter_1, app_settings_1;
    var MapSection;
    return {
        setters:[
            function (hours_formatter_1_1) {
                hours_formatter_1 = hours_formatter_1_1;
            },
            function (app_settings_1_1) {
                app_settings_1 = app_settings_1_1;
            }],
        execute: function() {
            class MapSection {
                constructor(id) {
                    this.id = id;
                }
                // TODO:NW get from server. Figure out why static properties cannot be referenced here
                static get PARKING_TYPES() {
                    let typeObj = {};
                    typeObj[app_settings_1.AppSettings.PARKING_TYPE_FREE] = { id: app_settings_1.AppSettings.PARKING_TYPE_FREE, name: 'Free' };
                    typeObj[app_settings_1.AppSettings.PARKING_TYPE_PAID] = { id: app_settings_1.AppSettings.PARKING_TYPE_PAID, name: 'Paid' };
                    typeObj[app_settings_1.AppSettings.PARKING_TYPE_NO_PARKING] = { id: app_settings_1.AppSettings.PARKING_TYPE_NO_PARKING, name: 'No parking' };
                    typeObj[app_settings_1.AppSettings.PARKING_TYPE_PERMIT] = { id: app_settings_1.AppSettings.PARKING_TYPE_PERMIT, name: 'Permit required' };
                    return typeObj;
                }
                static getTypeColor(section) {
                    if (section.mainParkingTypeId == app_settings_1.AppSettings.PARKING_TYPE_FREE && section.isHoursRestricted == 0 && (!section.mainShortTermMin || section.mainShortTermMin == 0))
                        return '#00ff00';
                    if (section.mainParkingTypeId == app_settings_1.AppSettings.PARKING_TYPE_NO_PARKING)
                        return '#ff0000';
                    if (section.mainParkingTypeId == app_settings_1.AppSettings.PARKING_TYPE_PAID && section.isHoursRestricted == 0)
                        return '#ffff00';
                    if (section.mainParkingTypeId == app_settings_1.AppSettings.PARKING_TYPE_PAID)
                        return '#ffa500';
                    if (section.mainParkingTypeId == app_settings_1.AppSettings.PARKING_TYPE_PERMIT)
                        return '#993366';
                    if (section.mainParkingTypeId == app_settings_1.AppSettings.PARKING_TYPE_FREE && section.isHoursRestricted == 1)
                        return '#0000ff';
                    if (section.mainParkingTypeId == app_settings_1.AppSettings.PARKING_TYPE_FREE && section.mainShortTermMin)
                        return '#0000ff';
                    else
                        return '#000000';
                }
                updateHoursHtml() {
                    let hf = new hours_formatter_1.HoursFormatter();
                    this.hoursHtml = hf.hoursTable(this);
                }
            }
            exports_1("MapSection", MapSection);
        }
    }
});
