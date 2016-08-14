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