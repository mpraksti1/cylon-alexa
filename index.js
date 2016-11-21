var Cylon = require("cylon");
var piblaster = require('pi-blaster.js');
var interval;

Cylon.robot({
  connections: {
    server: { name: 'pi', adaptor: 'mqtt', host: 'mqtt://broker.hivemq.com' }
  },

  work: function(my) {
    my.server.subscribe('rules');

    my.server.on('message', function (topic, data) {
        interval = setInterval(hammerStrike, 1000);
    });
  }
}).start();

var count = 0;

function hammerStrike () {
  var position = 0;

  if(count < 8) {
    if(count % 2 == 0 ) {
      position = 0.01;
    } else {
      position = 0.05;
    }

    piblaster.setPwm(22, position);
    count++;

  } else {
    count = 0;
    piblaster.setPwm(22, 0.00);
    clearInterval(interval);
  }
}
