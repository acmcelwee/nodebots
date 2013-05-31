var temporal = require('temporal'),
    express = require('express'),
    http = require('http'),
    io = require('socket.io'),
    fs = require('fs'),
    BOE = require('./boe'),
    app = express(),
    bot = new BOE(),
    connectedSessions = [],
    server;

bot.on('ready', function() {
  app.use('/static', express.static(__dirname + '/controller/static'));

  app.get('/', function(req, res) {
    res.sendfile(__dirname + '/controller/index.html');
  });

  server = http.createServer(app).listen(8000);

  io.listen(server).on('connection', function(socket) {
    connectedSessions.push(socket);

    socket.on('disconnect', function() {
      connectedSessions.splice(connectedSessions.indexOf(socket), 1);
    });

    socket.on('forward', function() {
      console.log('forward');
      bot.forward();
    });

    socket.on('reverse', function() {
      console.log('forward');
      bot.reverse();
    });

    socket.on('stop', function() {
      console.log('stop');
      bot.stop();
    });

    socket.on('turnRight', function() {
      console.log('turn right');
      bot.rotate(1);
    });

    socket.on('turnLeft', function() {
      console.log('turn left');
      bot.rotate(-1);
    });
  });

  // temporal.loop(5000, function() {
    // bot.moveForward();
    // temporal.delay(2500, function() {
      // bot.stop();
    // });
  // });

  // temporal.loop(2000, function() {
    // bot.honk(1000, 750);
  // });
});




