<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLobbiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lobbies', function(Blueprint $table){
            $table->increments('id');
            $table->string('name');
            $table->string('password');
            $table->integer('word_limit')->default(5);
            $table->integer('members')->default(0);
            //$table->integer('story_id');
            //$table->foreign('story_id')->references('id')->on('stories');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lobbies');
    }
}
