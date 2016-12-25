<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserLobby extends Model
{
    protected $table = 'user_lobby';
    public $timestamps = true;

    protected $guarded = [];
}
