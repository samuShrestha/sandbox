var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var sources = [['/', '/style.css'],['/index.html', '/style.css']];

//Start Server
http.listen(3000, function(){
  console.log('listening on *:3000');
});

//Server Routing
for (i = 0; i < sources[0].length; i++) {
  console.log('GET:' + sources[1][i]);
  app.get(sources[0][i], function (req, res) {
    res.sendfile(__dirname + sources[1][i]);
  });
}

//WebSocket Events
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});