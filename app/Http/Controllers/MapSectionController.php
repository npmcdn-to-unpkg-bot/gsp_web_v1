<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MapSection;
use App\Http\Requests;
use DB;
use Response;

class MapSectionController extends Controller
{

    private function getSnakeToCamel(){
        $selected = [];
        $atts = [
         'streetSide',
        'mainParkingTypeId',
        'mainPph',
        'mainShortTermMin',
        'numSpots',
        'isHoursRestricted',
        'hoursPph',
        'hoursData',
        'notes',
        'availabilityRating',
        'startLat',
        'startLng',
        'endLat',
        'endLng',
        'polyline',
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
    public function loadSectionsForMap()
    {
        //$results = MapSection::model()->getForMapViewport($_POST['minLat'],$_POST['minLng'],$_POST['maxLat'],$_POST['maxLng']);
        $minLat = $_POST['minLat'];
        $minLng = $_POST['minLng'];
        $maxLat = $_POST['maxLat'];
        $maxLng = $_POST['maxLng'];
        //var_dump($_POST);exit();
        //return $this->getSnakeToCamel();exit();
        // Fuck laravel not supporting named params in query methods, use a raw query
        $sections = DB::select('SELECT id,'.$this->getSnakeToCamel().' 
            FROM map_section WHERE
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $ms;
        if($id == -1 || !$id){
            $ms = new MapSection();
        } else{
            $ms = MapSection::find($id);
        }
        // TODO:NW figure out snake case USE var_dump($ms->snakeAttributes);exit;
        // var_dump($ms->toArray());exit;
        $sectionAtts = json_decode(file_get_contents("php://input"),true);
       
        foreach ($sectionAtts as $key => $value) {
            // client side atts, ignore
            if($key != 'newPolyline' && $key != 'hoursHtml' && $key != 'id' && $key != 'hoursType'){
                $ms[snake_case($key)] = $value;
            }
        }
        $ms['is_hours_restricted']=0;
        // for now, if permitted or paid, set has hours to T. CHANGE THIS IN FUTURE
        // paid or permit might be on all hours
        if($ms['main_parking_type_id'] == 2 || $ms['main_parking_type_id'] == 4){
          $ms['is_hours_restricted']=1;
        }

        // for now, hard code hours
        if(isset($sectionAtts['hoursType']) && $sectionAtts['hoursType']){
            $ms['hours_data'] = $this->getHoursTypeData($sectionAtts['hoursType']);
            $ms['is_hours_restricted']=1;
        }
        

        $ms->save();
        return Response::json([
            'error' => false,
            'section' => $ms->toJson()
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
        $ms = MapSection::find($id);
        $ms->delete();
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
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":null},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":1},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":2},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":3},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":4},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":5},
            {"selected":1,"start_time":"08:00","end_time":"20:00","on_parking_type_id":"1","on_short_term_min":"120","off_parking_type_id":"1","off_short_term_min":"","index":6}
            ]';
        }
        else if($type == 'permit7t7'){
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
