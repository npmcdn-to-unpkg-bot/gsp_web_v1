System.register(['./helpers/hours-formatter'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var hours_formatter_1;
    var MapSection;
    return {
        setters:[
            function (hours_formatter_1_1) {
                hours_formatter_1 = hours_formatter_1_1;
            }],
        execute: function() {
            class MapSection {
                constructor(id) {
                    this.id = id;
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
