<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MapPoint;
use App\Models\MapSection;
use App\Http\Requests;
use DB;
use Response;

class MapPointController extends Controller
{

    private function getSnakeToCamel(){
        $selected = [];
        $atts = [
        //'streetSide',
        'mainParkingTypeId',
        'pointTypeId',
        'mainPph',
        'mainShortTermMin',
        'numSpots',
        'isHoursRestricted',
        'hoursData', // TODO:NW about half the data, do this async?
        'notes',
        'availabilityRating',
        'lat',
        'lng',
        'submittedBy',
        'approved',
        'updatedAt'
        ];
        foreach($atts as $att){
            $selected[] = ' '.snake_case($att) . ' AS ' .$att;
        }
        return implode(',', $selected);
    }
    /**
     * Display all sections for a viewport
     *
     */
    public function loadPointsForMap()
    {
        //$results = MapSection::model()->getForMapViewport($_POST['minLat'],$_POST['minLng'],$_POST['maxLat'],$_POST['maxLng']);
        $minLat = $_POST['minLat'];
        $minLng = $_POST['minLng'];
        $maxLat = $_POST['maxLat'];
        $maxLng = $_POST['maxLng'];
        //var_dump($_POST);exit();
        //return $this->getSnakeToCamel();exit();
        // Fuck laravel not supporting named params in query methods, use a raw query
        $points = DB::select('SELECT id,'.$this->getSnakeToCamel().' 
            FROM map_point WHERE
              lng BETWEEN :minLng AND :maxLng
              AND
              lat BETWEEN :minLat AND :maxLat
            ORDER BY created_at DESC', 
            ['minLat'=>$minLat,'minLng'=>$minLng,'maxLat'=>$maxLat,'maxLng'=>$maxLng]
        );

        return Response::json([
            'error' => false,
            'points' => $points
        ]);
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
        $mp;
        if($id == -1 || !$id){
            $mp = new MapPoint();
        } else{
            $mp = MapPoint::find($id);
        }
        // TODO:NW figure out snake case USE var_dump($mp->snakeAttributes);exit;
        // var_dump($mp->toArray());exit;
        $ptAtts = json_decode(file_get_contents("php://input"),true);
       
        foreach ($ptAtts as $key => $value) {
            // client side atts, ignore
            if($key != 'hoursHtml' && $key != 'id' && $key != 'hoursType'){
                $mp[snake_case($key)] = $value;
            }
        }
        $mp['is_hours_restricted']=0;

        // for now, hard code hours
        if(isset($ptAtts['hoursType']) && $ptAtts['hoursType']){
            $mp['hours_data'] = $this->getHoursTypeData($ptAtts['hoursType']);
            $mp['is_hours_restricted']=1;
        }
        

        $mp->save();
        return Response::json([
            'error' => false,
            'point' => $mp->toJson()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $mp = MapPoint::find($id);
        $mp->delete();
        return Response::json([
            'error' => false
        ]);
    }

    public function show($id){}
        
    /*
     *  Encode array into JSON
    */
    private function json($data){
        if(is_array($data)){
            return json_encode($data);
        }
    }

    private function getHoursTypeData($type){
        $data='';
        if($type == 'slcMeters'){
            $data =  '[
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"2","on_short_term_min":"120","on_pph":"2.00","off_parking_type_id":"1","off_short_term_min":"","index":null},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"2","on_short_term_min":"120","on_pph":"2.00","off_parking_type_id":"1","off_short_term_min":"","index":1},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"2","on_short_term_min":"120","on_pph":"2.00","off_parking_type_id":"1","off_short_term_min":"","index":2},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"2","on_short_term_min":"120","on_pph":"2.00","off_parking_type_id":"1","off_short_term_min":"","index":3},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"2","on_short_term_min":"120","on_pph":"2.00","off_parking_type_id":"1","off_short_term_min":"","index":4},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":5},
            {"selected":0,"start_time":"","end_time":"","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":6}
            ]';
        }
        else if($type == 'slc2hr'){
            $data =  '[
            {"selected":1,"start_time":"08:00","end_time":"18:00","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":null},
            {"selected":1,"start_time":"08:00","end_time":"18:00","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":1},
            {"selected":1,"start_time":"08:00","end_time":"18:00","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":2},
            {"selected":1,"start_time":"08:00","end_time":"18:00","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":3},
            {"selected":1,"start_time":"08:00","end_time":"18:00","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":4},
            {"selected":1,"start_time":"08:00","end_time":"18:00","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":5},
            {"selected":1,"start_time":"08:00","end_time":"18:00","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":6}
            ]';
        }
        else if($type == 'permit7t7'){
            // make sure the on_short_term_min is correct, and type. Sometimes NP, sometimes short term
            $data =  '[
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"3","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":null},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"3","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":1},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"3","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":2},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"3","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":3},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"3","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":4},
            {"selected":0,"start_time":"","end_time":"","on_parking_type_id":"","on_short_term_min":"","off_parking_type_id":"","off_short_term_min":"","index":5},
            {"selected":0,"start_time":"","end_time":"","on_parking_type_id":"","on_short_term_min":"","off_parking_type_id":"","off_short_term_min":"","index":6}
            ]';
        }
        else if($type == 'permit8t3'){
            $data =  '[
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"3","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":null},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"3","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":1},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"3","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":2},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"3","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":3},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"3","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":4},
            {"selected":0,"start_time":"","end_time":"","on_parking_type_id":"","on_short_term_min":"","off_parking_type_id":"","off_short_term_min":"","index":5},
            {"selected":0,"start_time":"","end_time":"","on_parking_type_id":"","on_short_term_min":"","off_parking_type_id":"","off_short_term_min":"","index":6}
            ]';
        }
        $data = str_replace(" ", "", $data);
        $data = str_replace("\n", "", $data);
        return $data;
    }

}
