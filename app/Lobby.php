<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lobby extends Model
{
    protected $table = 'lobbies';
    public $timestamps = true;

    protected $guarded = [];
}
