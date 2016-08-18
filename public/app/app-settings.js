System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AppSettings;
    return {
        setters:[],
        execute: function() {
            class AppSettings {
            }
            //public static get API_ENDPOINT(): string { return 'http://127.0.0.1:6666/api/'; }
            AppSettings.PARKING_TYPE_FREE = 1;
            AppSettings.PARKING_TYPE_PAID = 2;
            AppSettings.PARKING_TYPE_NO_PARKING = 3;
            AppSettings.PARKING_TYPE_PERMIT = 4;
            AppSettings.APP_URL = GSP_APP_URL;
            AppSettings.APP_RELATIVE_URL = GSP_APP_RELATIVE_URL;
            exports_1("AppSettings", AppSettings);
        }
    }
});
