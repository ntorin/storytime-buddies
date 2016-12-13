<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home/index');
});

Auth::routes();

//GET
Route::get('/library', 'LibraryController@index');

Route::get('/lobby', 'LobbyController@index');


//POST
Route::post('/publishstory', 'LobbyController@publishStory');
Route::post('/getstorypreviews', 'SiteHomeController@getStoryPreviews');
Route::post('/createlobby', 'SiteHomeController@createLobby');
Route::post('/utils/user', 'UtilController@getUser');
Route::post('/lobbyconnect', 'LobbyController@connect');
Route::post('/lobbydisconnect', 'LobbyController@disconnect');
Route::post('/getlobbies', 'SiteHomeController@getLobbies');
Route::post('/getsearchquery', 'LibraryController@search');
Route::post('/getcomments', 'LibraryController@getComments');
Route::post('/postcomment', 'LibraryController@postComment');
Route::post('/linkstorywriter', 'LobbyController@linkStoryWriter');