<?php

namespace App\Http\Controllers;

use App\Story;
use App\Lobby;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;

class SiteHomeController extends Controller
{
    public function index()
    {
        return view('home/index');
    }

    public function getStoryPreviews(Request $request){
        $stories = Story::orderBy('likes', 'asc')->take(10)->get();
        $storyarray = array();
        foreach ($stories as $story){
            array_push($storyarray, $story);
        }
        return $storyarray;
    }

    public function createLobby(Request $request){
        $lobby = Lobby::create([
           'name' => $request->input('name'),
            'password' => $request->input('password'),
            'word_limit' => 5,
            'members' => 0,
        ]);
        $story = Story::create([
            'name' => 'Untitled',
            'passage' => '',
            'lobby_id' => $lobby->id,
            'editing' => 1,
            'completed' => 0,
            'likes' => 0,
        ]);
        $_SESSION[$request->input('name')] = $lobby;

        return URL::to("/lobby?name=" . $lobby->name . "&id=" . $lobby->id);
    }

    public function getLobbies()
    {
        $lobbies = Lobby::all();
        return $lobbies;
    }
}
