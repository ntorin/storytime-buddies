<?php

namespace App\Http\Controllers;

use App\Story;
use App\UserStory;
use Illuminate\Http\Request;
use App\Lobby;
use App\UserLobby;

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
        $story = Story::where('lobby_id', $request->input('roomid'))->first();
        $story->passage .= $request->input('msg') . ' ';
        $story->save();
    }

    public function connect(Request $request)
    {
        $lobby = Lobby::find($request->input('roomid'));
        $lobby->members++;
        $lobby->save();
        $connection = UserLobby::create([
           'user_id' => $request->input('userid'),
            'lobby_id' => $request->input('roomid'),
        ]);

        $lobbymembers = UserLobby::where('lobby_id', $request->input('roomid'))->get();

        $activeturn = false;
        $activemaster = false;
        foreach($lobbymembers as $lobbymember){
            if($lobbymember->master == 1){
                $activemaster = true;
            }

            if($lobbymember->turn == 1){
                $activeturn = true;
            }
        }

        if(!$activeturn){
            $lobbymembers[0]->turn = 1;
        }

        if(!$activemaster){
            $lobbymembers[0]->master = 1;
        }
        $lobbymembers[0]->save();

        $story = Story::where('lobby_id', $request->input('roomid'))->first();
        $lobby->story = $story;
        return $lobby;
    }

    public function alterTurn(Request $request){
        $lobbymembers = UserLobby::where('lobby_id', $request->input('roomid'))->get();

        $activeturn = false;
        foreach($lobbymembers as $lobbymember){
            if($lobbymember->turn == 1){
                $activeturn = true;
                $lobbymember->turn = 0;
                $lobbymember->save();
                continue;
            }

            if($activeturn){
                $lobbymember->turn = 1;
                $activeturn = false;
                $lobbymember->save();
                break;
            }
        }

        if($activeturn){
            $lobbymembers[0]->turn = 1;
            $lobbymembers[0]->save();
        }

        return $lobbymembers;
    }

    public function getLobbyMembers(Request $request){
        $lobbymembers = UserLobby::where('lobby_id', $request->input('roomid'))->get();

        return $lobbymembers;
    }

    public function alterMaster(Request $request){

    }

    public function disconnect(Request $request)
    {
        $lobby = Lobby::find($request->input('roomid'));
        $lobby->members--;
        if ($lobby->members <= 0) {
            $lobby->delete();
            $story = Story::where('lobby_id', $request->input('roomid'))->first();
            $story->lobby_id = -1;
            $story->editing = 0;
            $story->save();
        } else {
            $lobby->save();
        }
        $connection = UserLobby::where('lobby_id', $request->input('roomid'))->where('user_id', $request->input('userid'))->first();
        $connection->delete();


        $lobbymembers = UserLobby::where('lobby_id', $request->input('roomid'))->get();

        if(count($lobbymembers) > 0){
            $activeturn = false;
            $activemaster = false;
            foreach($lobbymembers as $lobbymember){
                if($lobbymember->master == 1){
                    $activemaster = true;
                }

                if($lobbymember->turn == 1){
                    $activeturn = true;
                }
            }

            if(!$activeturn){
                $lobbymembers[0]->turn = 1;
            }

            if(!$activemaster){
                $lobbymembers[0]->master = 1;
            }
            $lobbymembers[0]->save();
        }
    }

    public function linkStoryWriter(Request $request){
        UserStory::create([
            'user_id' => $request->input('userid'),
            'story_id' => $request->input('storyid'),
        ]);
    }
}
