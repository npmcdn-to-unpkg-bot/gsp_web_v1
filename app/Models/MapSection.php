<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class MapSection
 */
class MapSection extends Model
{
    protected $table = 'map_section';

    public $timestamps = true;

    protected $fillable = [
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

    protected $guarded = [];

        
}

/* HOURS DATA IS LIKE

[
{"selected":1,"start_time":"08:00","end_time":"18:00","on_parking_type_id":"1","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":null},
{"selected":1,"start_time":"08:00","end_time":"18:00","on_parking_type_id":"1","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":1},
{"selected":1,"start_time":"08:00","end_time":"18:00","on_parking_type_id":"1","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":2},
{"selected":1,"start_time":"08:00","end_time":"18:00","on_parking_type_id":"1","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":3},
{"selected":1,"start_time":"08:00","end_time":"18:00","on_parking_type_id":"1","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":4},
{"selected":1,"start_time":"08:00","end_time":"18:00","on_parking_type_id":"1","on_short_term_min":"","off_parking_type_id":"1","off_short_term_min":"","index":5},
{"selected":0,"off_parking_type_id":"1","off_short_term_min":"","has_hours":false,"start_time":null,"end_time":null,"on_parking_type_id":null,"on_short_term_min":null,"index":6}
]



*/