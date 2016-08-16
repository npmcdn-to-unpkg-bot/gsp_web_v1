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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        /*
        if($this->get_request_method() != "POST"){
            $this->response('',406);
        }

        $customer = json_decode(file_get_contents("php://input"),true);
        $column_names = array('customerName', 'email', 'city', 'address', 'country');
        $keys = array_keys($customer);
        $columns = '';
        $values = '';
        foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
           if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
            }else{
                $$desired_key = $customer[$desired_key];
            }
            $columns = $columns.$desired_key.',';
            $values = $values."'".$$desired_key."',";
        }
        $query = "INSERT INTO angularcode_customers(".trim($columns,',').") VALUES(".trim($values,',').")";
        if(!empty($customer)){
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            $success = array('status' => "Success", "msg" => "Customer Created Successfully.", "data" => $customer);
            $this->response($this->json($success),200);
        }else
            $this->response('',204);    //"No Content" status
        */
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
        $ms;
        if($id == -1 || !$id){
            $ms = new MapSection();
        } else{
            $ms = MapSection::find($id);
        }
        $section = json_decode(file_get_contents("php://input"),true);
       
        foreach ($section as $key => $value) {
            // client side atts, ignore
            if($key != 'newPolyline' && $key != 'hoursHtml'){
                $ms->$key = $value;
            }
        }
        $ms->save();
        return Response::json([
            'error' => false,
            'section' => $ms->toJson()
        ]);
        /*
        $customer = json_decode(file_get_contents("php://input"),true);
        $id = (int)$customer['id'];
        $column_names = array('customerName', 'email', 'city', 'address', 'country');
        $keys = array_keys($customer['customer']);
        $columns = '';
        $values = '';
        foreach($column_names as $desired_key){ // Check the customer received. If key does not exist, insert blank into the array.
           if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
            }else{
                $$desired_key = $customer['customer'][$desired_key];
            }
            $columns = $columns.$desired_key."='".$$desired_key."',";
        }
        $query = "UPDATE angularcode_customers SET ".trim($columns,',')." WHERE customerNumber=$id";
        if(!empty($customer)){
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            $success = array('status' => "Success", "msg" => "Customer ".$id." Updated Successfully.", "data" => $customer);
            $this->response($this->json($success),200);
        }else
            $this->response('',204);    // "No Content" status
        */
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        /*
        if($this->get_request_method() != "DELETE"){
            $this->response('',406);
        }
        $id = (int)$this->_request['id'];
        if($id > 0){                
            $query="DELETE FROM angularcode_customers WHERE customerNumber = $id";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            $success = array('status' => "Success", "msg" => "Successfully deleted one record.");
            $this->response($this->json($success),200);
        }else
            $this->response('',204);    // If no records "No Content" status
        */
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

}
