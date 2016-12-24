var s = io.connect('http://' + window.location.hostname + ':3000');
//var socket = io.connect('http://' + window.location.hostname + ':3000');
var room = {
    _token: $('meta[name=csrf-token]').attr('content'),
    name: getQueryParameter('name'),
    id: getQueryParameter('id'),
    roomname: getQueryParameter('name') + getQueryParameter('id'),
    lobby: null,
};
var roomname = getQueryParameter('name') + getQueryParameter('id');
alert(room.id);
//var socket = io.connect('http://' + window.location.hostname + ':3000' + '/lobby/' + roomname);
s.on('connect', function(){
    $.post("http://" + window.location.hostname + "/lobbyconnect", {
        _token: $('meta[name=csrf-token]').attr('content'),
        roomname: room.name,
        roomid: room.id,
    }).done(function(data){
        room.lobby = data;
    });
    s.on('disconnecting', function(){
        console.log('disconnected');

    });
});
s.emit('join_lobby', room);

window.onbeforeunload = function(){
    $.post("http://" + window.location.hostname + "/lobbydisconnect", {
        _token: $('meta[name=csrf-token]').attr('content'),
        roomname: room.name,
        roomid: room.id,
    });
    return null;
};