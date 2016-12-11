@extends('layouts.base')
@section('content')
    <script>

        function getQueryParameter ( parameterName ) {
            var queryString = window.top.location.search.substring(1);
            var parameterName = parameterName + "=";
            if ( queryString.length > 0 ) {
                begin = queryString.indexOf ( parameterName );
                if ( begin != -1 ) {
                    begin += parameterName.length;
                    end = queryString.indexOf ( "&" , begin );
                    if ( end == -1 ) {
                        end = queryString.length
                    }
                    return unescape ( queryString.substring ( begin, end ) );
                }
            }
            return "null";
        }
    </script>
    <script src="{{asset('js/components/initsocket.js')}}"></script>
    <div id="storywriter" class="col-xs-8">
        <!-- storytime is here -->
        <script type="text/babel" src="{{asset('js/components/react/storywriter.js')}}"></script>
    </div>
    <div id="lobbychat" class="col-xs-4">
        <!-- lobby chat is here -->
        <script type="text/babel" src="{{asset('js/components/react/chatlog.js')}}"></script>
    </div>
@stop