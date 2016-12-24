var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var $ = require('jquery');

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
    console.log('#members: ' + res.length);
    return res;
}

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('test', function(){
        console.log('test get');
    });
    socket.on('join_lobby', function(room){
        console.log('joining lobby ...');
        var lobby = io.of('/lobby/' + room.roomname);
        console.log(io.nsps);
        /*var connectedClients = Object.keys(io.nsps['/lobby/' + room.roomname].sockets);
         if(connectedClients.length > 0) {
            console.log('date set');
            connectedClients[0].test = new Date();
             console.log(connectedClients[0].test);
        } */
        var test = new Date();
        console.log(test);

        lobby.removeAllListeners('connection');

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
            socket.on('publish_complete', function(story){
                console.log('publish completed');
                lobby.emit('publish_complete', story);
            });
        });

        io.emit('lobby_created', []);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});