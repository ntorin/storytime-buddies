var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat_message', function (msg) {
        console.log('message sent: ' + msg);
        io.emit('chat_message', msg);
    });

    socket.on('story_append', function (msg) {
        console.log('story words: ' + msg);
        io.emit('story_append', msg);
    });

});


http.listen(3000, function () {
    console.log('listening on *:3000');
});