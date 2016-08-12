<!DOCTYPE html>
<html>
    <head>
        <base href="/">
        <title>Laravel</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="css/app.css" />
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=<?php echo env('MAPS_API_KEY'); ?>&libraries=geometry"></script>

        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
                font-weight: 100;
                font-family: 'Lato', sans-serif;
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 96px;
            }
        </style>
        <!-- 1. Load libraries -->
        <!-- Polyfill(s) for older browsers -->
        <script src="core-js/client/shim.min.js"></script>
        <script src="zone.js/dist/zone.js"></script>
        <script src="reflect-metadata/Reflect.js"></script>
        <script src="systemjs/dist/system.src.js"></script>
        <!-- 2. Configure SystemJS -->
        <script src="systemjs.config.js"></script>
        <script>
        System.import('app').catch(function(err){ console.error(err); });
        </script>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <my-app>Loading...</my-app>
            </div>
        </div>
    </body>
</html>
