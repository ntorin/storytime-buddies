<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChatlogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chatlogs', function(Blueprint $table){
            $table->increments('id');
            $table->string('message');
            $table->integer('lobby_id');
            //$table->foreign('lobby_id')->references('id')->on('lobbies');
            $table->integer('user_id');
            //$table->foreign('user_id')->references('id')->on('users');

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
        Schema::dropIfExists('chatlogs');
    }
}
