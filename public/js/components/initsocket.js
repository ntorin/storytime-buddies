var s = io.connect('http://' + window.location.hostname + ':3000');
//var socket = io.connect('http://' + window.location.hostname + ':3000');
var urlsplit = document.location.href.split('/');
var roomname = urlsplit[urlsplit.length - 1];

//var socket = io.connect('http://' + window.location.hostname + ':3000' + '/lobby/' + roomname);

s.emit('join_lobby', roomname);