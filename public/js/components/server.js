var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var $ = require('jquery');

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('join_lobby', function(room){
        console.log('joining lobby ...');
        var lobby = io.of('/lobby?name=' + room.name + "&id=" + room.id);
        lobby.on('connection', function(socket){
            console.log('connection on');
            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
            socket.on('chat_message', function (msg) {
                console.log('message sent: ' + msg);
                lobby.emit('chat_message', msg);
            });

            socket.on('story_append', function (msg) {
                console.log('story words: ' + msg);
                lobby.emit('story_append', msg);
            });

            socket.on('story_publish', function(msg){
                console.log('call for publish');
                lobby.emit('story_publish', msg);
            });
        });
        io.emit('lobby_created');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
})

function findClientsSocket(roomId, namespace) {
    var res = []
        // the default namespace is "/"
        , ns = io.of(namespace ||"/");

    if (ns) {
        for (var id in ns.connected) {
            if(roomId) {
                var index = ns.connected[id].rooms.indexOf(roomId);
                if(index !== -1) {
                    res.push(ns.connected[id]);
                }
            } else {
                res.push(ns.connected[id]);
            }
        }
    }
    return res;
}