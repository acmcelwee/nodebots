(function() {
  var forEach = Array.prototype.forEach,
      $$ = document.querySelectorAll.bind(document),
      socket = io.connect('http://localhost:8000'),
      eventsMap = {
        32: 'stop',
        37: 'turnLeft',
        38: 'forward',
        39: 'turnRight',
        40: 'reverse'
      };

  ['forward', 'reverse', 'stop', 'turnRight', 'turnLeft'].forEach(function(command) {
    forEach.call($$('.' + command), function(item) {
      item.addEventListener('click', function(e) {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
        console.log('click');

        socket.emit(command);
      }, false);
    });
  });

  $(document).keydown(function(e){
    if (e.keyCode in eventsMap) {
      socket.emit(eventsMap[e.keyCode]);
    }

    return false;
  });
})();
