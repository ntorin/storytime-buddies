@extends('layouts.base')
@section('content')
    <div id="library" class="col-xs-12">
        <!-- library goes here -->
        <script type="text/babel" src="{{asset('js/components/react/library.js')}}"></script>
    </div>
    <div id="searchbarx" class="col-xs-12">
        <!-- search bar for library-->
    </div>
    <div id="storyarchivex" class="col-xs-8">
        <!-- story goes here-->
    </div>
    <div id="resultscommentsx" class="col-xs-4">
        <!-- comments go here. when you search for something, search results also appear here -->
    </div>
@stop