<?php

namespace App\Http\Controllers;

use App\Comments;
use Illuminate\Http\Request;
use App\Story;

class LibraryController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('library/index');
    }

    public function search(Request $request){
        $query = Story::where('name', 'LIKE', '%' . $request->searchQuery . '%')->get();
        return $query;
    }

    public function getComments(Request $request){
        $query = Comments::where('story_id', $request->input('storyid'))->get();
        return $query;
    }

    public function postComment(Request $request){
        Comments::create([
            'user_id' => $request->input('userid'),
            'story_id' => $request->input('storyid'),
            'comment' => $request->input('comment'),
            'likes' => 0,
        ]);

        $query = Comments::where('story_id', $request->input('storyid'))->get();
        return $query;
    }
}
