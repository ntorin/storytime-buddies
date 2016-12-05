@extends('layouts.base')
@section('content')
    <div class="jumbotron">
        <h1>It's Storytime!</h1>
        <p>This example is a quick exercise to illustrate how the default, static navbar and fixed to top navbar work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p>
    </div>
    <div id="libpreview" class="col-sm-6" style="background-color: red">
        <!-- library previews here -->
        <script type="text/babel" src="{{asset('js/components/libpreview.js')}}"></script>
    </div>
    <div class="col-sm-6" style="background-color: blue">
        <!-- list of lobbies here -->
    </div>
@stop
