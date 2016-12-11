var s = io.connect('http://' + window.location.hostname + ':3000');
//var socket = io.connect('http://' + window.location.hostname + ':3000');
var urlsplit = document.location.href.split('/');
var roomname = urlsplit[urlsplit.length - 1];
var room = {
    name: getQueryParameter('name'),
    id: getQueryParameter('id'),
}
//var socket = io.connect('http://' + window.location.hostname + ':3000' + '/lobby/' + roomname);

s.on('connect', function(){
    $.post("http://" + window.location.hostname + "/lobbyconnect", {
        _token: $('meta[name=csrf-token]').attr('content'),
        roomname: room.name,
        roomid: room.id,
    });
    s.on('disconnect', function(){
        $.post("http://" + window.location.hostname + "/lobbydisconnect", {
            _token: $('meta[name=csrf-token]').attr('content'),
            roomname: room.name,
            roomid: room.id,
        });
    });
});
s.emit('join_lobby', room);