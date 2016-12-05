@extends('layouts.base')
@section('content')
    <div class="col-xs-8" style="background-color: red">
        wa
        <!-- storytime is here -->
    </div>
    <div class="col-xs-4">
        <!-- lobby chat is here -->
        <ul id="messages"></ul>
        <form action="">
            <input id="m" autocomplete="off" /><button>Send</button>
        </form>
        <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
        <script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
        <script src="{{asset('node_modules/socket.io/node_modules/socket.io-client/socket.io.js')}}"></script>
        <script>
            var socket = io.connect('http://' + window.location.hostname + ':3000');
            $('form').submit(function(){
                socket.emit('chat message', $('#m').val());
                $('#m').val('');
                return false;
            });
            socket.on('chat message', function(msg){
                $('#messages').append($('<li>').text(msg));
            });
        </script>
    </div>
@stop