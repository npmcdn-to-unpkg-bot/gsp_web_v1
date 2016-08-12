System.register(['@angular/router', './map.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, map_component_1;
    var appRoutes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (map_component_1_1) {
                map_component_1 = map_component_1_1;
            }],
        execute: function() {
            appRoutes = [
                {
                    path: 'map',
                    component: map_component_1.MapComponent
                }
            ];
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    }
});
