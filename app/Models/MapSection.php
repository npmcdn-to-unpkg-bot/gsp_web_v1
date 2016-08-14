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
        'street_side',
        'main_parking_type_id',
        'main_pph',
        'main_short_term_min',
        'num_spots',
        'is_hours_restricted',
        'hours_pph',
        'hours_data',
        'notes',
        'availability_rating',
        'start_lat',
        'start_lng',
        'end_lat',
        'end_lng',
        'polyline',
        'submitted_by',
        'approved'
    ];

    protected $guarded = [];

        
}