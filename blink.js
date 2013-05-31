var johnny = require('johnny-five'),
    board = new johnny.Board();

board.on('ready', function() {
  // Create an Led on pin 13 and strobe it on/off
  // Optionally set the speed; defaults to 100ms
  (new johnny.Led(13)).strobe(17);

  // Create an Led on pin 12 and strobe it on/off
  // Optionally set the speed; defaults to 100ms
  (new johnny.Led(12)).strobe(50);
});
