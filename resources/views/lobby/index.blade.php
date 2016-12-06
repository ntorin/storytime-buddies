@extends('layouts.base')
@section('content')
    <script src="{{asset('js/components/initsocket.js')}}"></script>
    <div id="storywriter" class="col-xs-8">
        <!-- storytime is here -->
        <script type="text/babel" src="{{asset('js/components/storywriter.js')}}"></script>
    </div>
    <div id="lobbychat" class="col-xs-4">
        <!-- lobby chat is here -->
        <script type="text/babel" src="{{asset('js/components/chatlog.js')}}"></script>
    </div>
@stop