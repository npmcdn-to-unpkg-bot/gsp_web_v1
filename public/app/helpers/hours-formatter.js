System.register(['../map-section', '../app-settings', '../section-hours'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var map_section_1, app_settings_1, section_hours_1;
    var HoursFormatter;
    return {
        setters:[
            function (map_section_1_1) {
                map_section_1 = map_section_1_1;
            },
            function (app_settings_1_1) {
                app_settings_1 = app_settings_1_1;
            },
            function (section_hours_1_1) {
                section_hours_1 = section_hours_1_1;
            }],
        execute: function() {
            class HoursFormatter {
                constructor() {
                    this.daysOfWeek = ['m', 't', 'w', 'th', 'f', 's', 'su'];
                    this.pTypeInfo = map_section_1.MapSection.PARKING_TYPES;
                    this.defaultDay = new section_hours_1.SectionHours;
                    this.defaultDay.start_time = '08:00';
                    this.defaultDay.end_time = '20:00';
                    this.defaultDay.selected = 1;
                    this.defaultDay.on_parking_type_id = this.pTypeInfo[app_settings_1.AppSettings.PARKING_TYPE_PAID].name;
                    this.defaultDay.on_pph = 2.00;
                    this.defaultDay.on_short_term_min = null;
                    this.defaultDay.off_parking_type_id = this.pTypeInfo[app_settings_1.AppSettings.PARKING_TYPE_FREE].name;
                    this.defaultDay.off_pph = null;
                    this.defaultDay.off_short_term_min = null;
                }
                hoursTable(section) {
                    if (!section.hoursData)
                        return '';
                    let html = `
    <table style="width:400px;">
        <tbody>
        <tr>
          <th style="width:25px;">Day</th>
          <th style="width:75px;">Hours</th>
          <th style="width:100px;">On hrs type</th>
          <th style="width:100px;">Off hrs type</th>
        </tr>
        HOURSROWSHERE
      </tbody>
    </table>
    `;
                    let rows = '';
                    let hoursData = JSON.parse(section.hoursData);
                    for (let index = 0; index < 7; index++) {
                        rows = rows + '<tr>';
                        let hrs = hoursData[index];
                        if (hrs.selected == 0) {
                            rows = rows + '<td>' + this.daysOfWeek[index].toUpperCase() + '</td><td>None</td><td></td><td></td>';
                        }
                        else {
                            rows = rows + '<td>' + this.daysOfWeek[index].toUpperCase() + '</td>';
                            rows = rows + '<td>' + hrs.start_time + ' - ' + hrs.end_time + '</td>';
                            let onPriceAndLimits = '';
                            let offPriceAndLimits = '';
                            //TODO:NW get rid off hrsPph, we use on/off hrs now. Or if no hrs, mainPph
                            if (hrs.on_short_term_min) {
                                onPriceAndLimits = hrs.on_short_term_min + ' min. Limit';
                            }
                            if (hrs.on_parking_type_id == app_settings_1.AppSettings.PARKING_TYPE_PAID) {
                                onPriceAndLimits = onPriceAndLimits + '$' + hrs.on_pph + '/hr';
                            }
                            if (hrs.off_short_term_min) {
                                offPriceAndLimits = hrs.off_short_term_min + ' min. Limit';
                            }
                            if (hrs.off_parking_type_id == app_settings_1.AppSettings.PARKING_TYPE_PAID) {
                                offPriceAndLimits = offPriceAndLimits + '$' + hrs.off_pph + '/hr';
                            }
                            rows = rows + '<td>' + this.pTypeInfo[hrs.on_parking_type_id].name + ' ' + onPriceAndLimits + '</td>';
                            rows = rows + '<td>' + this.pTypeInfo[hrs.off_parking_type_id].name + ' ' + offPriceAndLimits + '</td>';
                        }
                        rows = rows + '</tr>';
                        ;
                    }
                    return html.replace('HOURSROWSHERE', rows);
                }
            }
            exports_1("HoursFormatter", HoursFormatter);
        }
    }
});
