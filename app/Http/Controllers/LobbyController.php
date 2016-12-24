<?php

namespace App\Http\Controllers;

use App\Story;
use App\UserStory;
use Illuminate\Http\Request;
use App\Lobby;

class LobbyController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('lobby/index');
    }

    public function publishStory(Request $request)
    {
        $story = Story::create([
            'name' => $request->input('name'),
            'passage' => $request->input('passage'),
            'editing' => $request->input('editing'),
            'completed' => $request->input('completed'),
            'likes' => 0,
        ]);

        return $story;
    }

    public function updateStory(Request $request){
        $story = Story::updateOrCreate(

        );
    }

    public function connect(Request $request)
    {
        $lobby = Lobby::find($request->input('roomid'));
        $lobby->members++;
        $lobby->save();
        return $lobby;
    }

    public function disconnect(Request $request)
    {
        $lobby = Lobby::find($request->input('roomid'));
        $lobby->members--;
        if ($lobby->members <= 0) {
            $lobby->delete();
        } else {
            $lobby->save();
        }
    }

    public function linkStoryWriter(Request $request){
        UserStory::create([
            'user_id' => $request->input('userid'),
            'story_id' => $request->input('storyid'),
        ]);
    }

    public function authLobby(Request $request){
        return false;
    }
}
