<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    protected $table = 'stories';
    public $timestamps = true;

    protected $guarded = [];
}
