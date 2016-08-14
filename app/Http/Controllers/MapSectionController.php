<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MapSection;
use App\Http\Requests;
use DB;
use Response;

class MapSectionController extends Controller
{
    /**
     * Display all sections for a viewport
     *
     */
    public function loadSectionsForMap()
    {
        //$results = MapSection::model()->getForMapViewport($_POST['minLat'],$_POST['minLng'],$_POST['maxLat'],$_POST['maxLng']);
        $minLat = $_POST['minLat'];
        $minLng = $_POST['minLng'];
        $maxLat = $_POST['maxLat'];
        $maxLng = $_POST['maxLng'];
        //var_dump($_POST);exit();
        // Fuck laravel not supporting named params in query methods, use a raw query
        $sections = DB::select('SELECT * FROM map_section WHERE
            (
              -- 1
              (
                start_lng BETWEEN :minLng AND :maxLng OR
                end_lng BETWEEN :minLng AND :maxLng
              )
              AND
              (
                start_lat BETWEEN :minLat AND :maxLat OR
                end_lat BETWEEN :minLat AND :maxLat
              )
            )
            OR
            (
              -- 2 pt. 1
              (
                (:minLat BETWEEN start_lat AND end_lat ) OR
                (:minLat BETWEEN end_lat AND start_lat )
              ) 
              AND
              (
                start_lng BETWEEN :minLng AND :maxLng OR
                end_lng BETWEEN :minLng AND :maxLng OR
                :minLng BETWEEN start_lng AND end_lng OR
                :minLng BETWEEN end_lng AND start_lng
              )
            )
            OR
            (
              -- 2 pt. 2
              (
                (:minLng BETWEEN start_lng AND end_lng ) OR
                (:minLng BETWEEN end_lng AND start_lng )
              ) 
              AND
              (
                start_lat BETWEEN :minLat AND :maxLat OR
                end_lat BETWEEN :minLat AND :maxLat OR
                :minLat BETWEEN start_lat AND end_lat OR
                :minLat BETWEEN end_lat AND start_lat
              )
            )
            ORDER BY created_at DESC', 
            ['minLat'=>$minLat,'minLng'=>$minLng,'maxLat'=>$maxLat,'maxLng'=>$maxLng]
        );

        return Response::json([
            'error' => false,
            'sections' => $sections
        ]);
        /*
        if(count($results) > 0)
            echo $this->getJsonSuccessReturnArray(array('sections' => $results));
        else{
            //render the form with errors, and the js will handle
            echo $this->getJsonErrorReturnArray(array('errorStrong' => 'no results'));
        }*/

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

}
