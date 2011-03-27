var net  = require('net'),
    util = require('util'),
    Gus  = require('./lib/gus/http');

// Creating a TCP server
var server = net.createServer(function (socket) {
  console.log("Connection from " + socket.remoteAddress);

  socket.on("data", function (data) {
    // BUT: what if the incoming message is chunked?
    var request = new Gus.Request(data.toString());
    console.log(util.inspect(request));

    socket.write("HTTP/1.1 200 OK\r\nContent-Length: 8\r\n\r\nThanks!\n");
  });

  socket.on("close", function (data) {
    console.log("Client closed connection");
  });

}); // net.createServer

server.listen(8081, "127.0.0.1");

console.log("HTTP Server listening on 127.0.0.1 port 8081");
