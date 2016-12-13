<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserStory extends Model
{
    protected $table = 'user_story';
    public $timestamps = true;

    protected $guarded = [];
}
