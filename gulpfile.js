var elixir = require('laravel-elixir');
var elixirTypscript = require('elixir-typescript');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
  mix.copy('node_modules/core-js', 'public/core-js');
  mix.copy('node_modules/reflect-metadata', 'public/reflect-metadata');
  mix.copy('node_modules/zone.js/dist/zone.js', 'public/zone.js/dist/zone.js');
  mix.copy('node_modules/systemjs', 'public/systemjs');
  mix.copy('node_modules/@angular', 'public/@angular');
  mix.copy('node_modules/angular2-in-memory-web-api', 'public/angular2-in-memory-web-api');
  mix.copy('node_modules/rxjs', 'public/rxjs');

    mix.typescript('app.js','public','/typescript/**/*.ts',{
        // If you use ES5, see http://stackoverflow.com/questions/35660498/angular-2-cant-find-promise-map-set-and-iterator
        "target": "ES6",
        "module": "system",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false,
    });
});
