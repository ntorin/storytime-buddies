<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Lobby extends Model
{
    protected $table = 'lobbies';
    public $timestamps = true;

    protected $guarded = [];


}
