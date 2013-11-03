var http = require('http');

var server = http.createServer();

server.on('request', function(request, response) {
  console.log(request.url);
  if ( request.url !== '/test' ) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('hello ' + request.url);
  }else{
    response.writeHead(400, {'Content-Type': 'text/plain'});
    response.end('error ' + request.url);
  }
});

server.listen(8080, 'localhost');
