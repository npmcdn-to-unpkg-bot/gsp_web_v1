<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    // TODO:NW move into a controller and don't use welcome view
    session(['sectionsRetrieved' => []]); // reset map section cache on page reload
    return view('welcome');
});

Route::resource('mapSection', 'MapSectionController');
Route::post('mapSection/loadSectionsForMap', 'MapSectionController@loadSectionsForMap');

Route::resource('mapPoint', 'MapPointController');
Route::post('mapPoint/loadPointsForMap', 'MapPointController@loadPointsForMap');

Route::group(['middleware' => 'cors'], function(){
    Route::get('mapSection', 'MapSectionController@loadSectionsIndex');
});
