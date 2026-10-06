<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kost extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'status',
        'tenant_name',
        'tenant_phone',
        'rent_type',
        'rent_start',
        'rent_end',
        'daily_price',
        'weekly_price',
        'monthly_price',
        'notes',
    ];

    protected $casts = [
        'rent_start' => 'date',
        'rent_end' => 'date',
        'daily_price' => 'integer',
        'weekly_price' => 'integer',
        'monthly_price' => 'integer',
    ];
}
