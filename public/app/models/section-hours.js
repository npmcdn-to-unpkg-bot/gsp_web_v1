System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SectionHours;
    return {
        setters:[],
        execute: function() {
            class SectionHours {
                static getTypes() {
                    // note if has permit hours but all others allowed to park time limited,
                    // main p type is free time limited, make note if have permit no retriction
                    return [
                        { value: '', label: 'none' },
                        { value: 'slcMeters', label: 'SLC 8t8|S 2h|S NL' },
                        { value: 'slc2hr', label: '8t6 All days' },
                        { value: 'permit7t7', label: '7t7|S NL|Su NL' },
                        { value: 'permit8t3', label: '8t3|S NL|Su NL' }
                    ];
                }
            }
            exports_1("SectionHours", SectionHours);
        }
    }
});
