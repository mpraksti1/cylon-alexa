var Cylon = require("cylon");
var piblaster = require('pi-blaster.js');
var interval;

Cylon.robot({
  connections: {
    server: { name: 'pi', adaptor: 'mqtt', host: 'mqtt://test.mosquitto.org' },
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    led: { driver: 'led', pin: 13 }
  },

  work: function(my) {
    my.server.subscribe('rules');

    my.server.on('message', function (topic, data) {
      every((1).second(), my.led.toggle);
      interval = setInterval(hammerStrike, 600);
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
     position = 0.09;
    }

    piblaster.setPwm(22, position);
    count++;

  } else {
    count = 0;
    piblaster.setPwm(22, 0.00);
    clearInterval(interval);
  }
}
