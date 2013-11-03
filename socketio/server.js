var fs = require('fs');
var http = require('http');

var server = http.createServer();
var io = require('socket.io').listen(server);

server.on('request', function (req,res) {
  var url = req.url;
  if (url === "/socketio") {
    fs.readFile('client.html', function (err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8'
      });
      res.end(data);
    });
  }else{
    res.writeHead(404, {
      'Content-Type': 'text/html; charset=UTF-8'
    });
    res.end();
  }
});
server.listen(8080);

io.sockets.on('connection', function (socket) {
  socket.on('set username', function (data) {
    socket.set('username',data);
    console.log('username: ' + data);
  });
  socket.on('set message', function (data) {
    socket.get('username', function(err, name) {
      socket.broadcast.emit('broadcast message', {message: name + " : " + data}, function (data) {
        console.log('message: ' + data);
      });
    });
  });
});

