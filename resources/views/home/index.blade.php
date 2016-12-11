@extends('layouts.base')
@section('content')
    <div class="jumbotron">
        <h1>It's Storytime!</h1>
        <p>This example is a quick exercise to illustrate how the default, static navbar and fixed to top navbar work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p>
    </div>
    <div id="libpreview" class="col-sm-6" >
        <!-- library previews here -->
        <script type="text/babel" src="{{asset('js/components/react/libpreview.js')}}"></script>
    </div>
    <div id="lobbylist" class="col-sm-6">
        <!-- list of lobbies here -->
        <script type="text/babel" src="{{asset('js/components/react/lobbylist.js')}}"></script>
    </div>
@stop
