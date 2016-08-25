System.register(['@angular/router', './components/main-map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, main_map_1;
    var appRoutes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (main_map_1_1) {
                main_map_1 = main_map_1_1;
            }],
        execute: function() {
            appRoutes = [
                {
                    path: 'map',
                    component: main_map_1.MapComponent
                }
            ];
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    }
});
