var five = require('johnny-five'),
    events = require('events'),
    util = require('util'),
    boardReady = false,
    board, leftServo, rightServo, piezo;

board = new five.Board();
board.on('ready', function() {
  leftServo = new five.Servo({
    pin: 10,
    range: [ 0, 180 ],
    type: 'continuous',
    startAt: 90,
    center: false
  });

  rightServo = new five.Servo({
    pin: 11,
    type: 'continuous',
    startAt: 90,
    center: false
  });

  piezo = new five.Piezo(3);

  board.repl.inject({
    leftServo: leftServo,
    rightServo: rightServo,
    piezo: piezo
  });

  boardReady = true;
});

function BOE() {
  var self = this;
  self.currentDirection = 180;

  if (!boardReady) {
    // board.on('ready', function() {
      // self.emit('ready');
    // });
  } else {
    process.nextTick(function() {
      self.emit('ready');
    });
  }
}

util.inherits( BOE, events.EventEmitter );

BOE.prototype.ready = function() {
  this.emit('ready');

  board.repl.inject({
    bot: this
  });
};

BOE.prototype.forward = function() {
  if (!boardReady) {
    return;
  }

  leftServo.move(110);
  rightServo.move(80);

  return this;
};

BOE.prototype.reverse = function() {
  if (!boardReady) {
    return;
  }

  leftServo.move(80);
  rightServo.move(110);

  return this;
};

BOE.prototype.stop = function() {
  if (!boardReady) {
    return;
  }

  leftServo.move(90);
  rightServo.move(90);

  return this;
};

BOE.prototype.turn = function(degrees) {
  leftServo.move(80);
  rightServo.move(110);
};

BOE.prototype.rotate = function(direction) {
  direction = direction || 1;

  if (direction < 0) {
    leftServo.move(80);
    rightServo.move(80);
  } else if (direction > 0) {
    leftServo.move(110);
    rightServo.move(110);
  }
};

BOE.prototype.honk = function(tone, duration) {
  if (!boardReady) {
    return;
  }

  duration = duration || 1000;
  piezo.tone(tone, duration);
};

module.exports = BOE;
