@extends('layouts.base')
@section('content')
    <div id="searchbar" class="col-xs-12">
        <!-- search bar for library-->
        <script type="text/babel" src="{{asset('js/components/react/searchbar.js')}}"></script>
    </div>
    <div id="storyarchive" class="col-xs-8" style="background-color: red">
        <!-- story goes here-->
        <script type="text/babel" src="{{asset('js/components/react/storyarchive.js')}}"></script>
    </div>
    <div id="resultscomments" class="col-xs-4" style="background-color: blue">
        <!-- comments go here. when you search for something, search results also appear here -->
        <script type="text/babel" src="{{asset('js/components/react/resultscomments.js')}}"></script>
    </div>
@stop