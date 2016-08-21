var elixir = require('laravel-elixir');
//var elixirTypscript = require('elixir-typescript');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var Task = elixir.Task;

// TODO:NW make an angular typescript node module

gulp.task('typescript', function(){
  var assetPath = './' + elixir.config.assetsPath;
  var search = '/typescript/**';
  var options = {
      // If you use ES5, see http://stackoverflow.com/questions/35660498/angular-2-cant-find-promise-map-set-and-iterator
      "target": "ES6",
      "module": "system",
      "moduleResolution": "node",
      "sourceMap": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "removeComments": false,
      "noImplicitAny": false,
  };
  var outputFolder = 'public';
  return gulp.src(assetPath + search)
    .pipe(ts(options))
    .pipe(gulp.dest(outputFolder))
});

// 'gulp' runs the defulat task, which is set to everything in the elixir function
// 'gulp --production' runs everything not within an if(!elixir.config.production) statement
// 'gulp watch' listens for sass (auto by convention?), TODO:NW How to get typescript in the watch
// TODO:NW What happens on live if we do 'gulp'? Do we need to set a config val to
// 'production', or only run 'gulp --prodcution' on live?

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
  if(!elixir.config.production){
    mix.sass('app.scss'); // has watcher by default?
    mix.task('typescript', 'resources/assets/typescript/**');
    // minify individual files
    mix.scripts([
      'core-js/client/shim.min.js',
      'reflect-metadata/Reflect.js',
      'zone.js/dist/zone.js',
      'systemjs/dist/system.src.js'
    ],
      'public/vendor.js', 'node_modules'
    );
    
    // we need the the entire folder for these, the libs reference indiv files in the folders
    mix.copy('node_modules/@angular', 'public/@angular');
    mix.copy('node_modules/angular2-in-memory-web-api', 'public/angular2-in-memory-web-api');
    mix.copy('node_modules/rxjs', 'public/rxjs');

    // let's not hack this thing's source, make our own task above
    //mix.typescript('app.js','public','/typescript/**/*.ts',{
    /* 
        // If you use ES5, see http://stackoverflow.com/questions/35660498/angular-2-cant-find-promise-map-set-and-iterator
        "target": "ES6",
        "module": "system",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false,
    });*/
  }
});
