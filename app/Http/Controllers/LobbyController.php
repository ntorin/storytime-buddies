<?php

namespace App\Http\Controllers;

use App\Story;
use Illuminate\Http\Request;
use App\Lobby;

class LobbyController extends Controller
{
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
    }

    public function connect(Request $request){
        $lobby = Lobby::find($request->input('roomid'));
        $lobby->members++;
        $lobby->save();
    }

    public function disconnect(Request $request){
        $lobby = Lobby::find($request->input('roomid'));
        $lobby->members--;
        if($lobby->members <= 0){
            $lobby->delete();
        }else {
            $lobby->save();
        }
    }
}
