var Cylon = require("cylon");

var piblaster = require('pi-blaster.js');

Cylon.robot({
  connections: {
    server: { name: 'pi', adaptor: 'mqtt', host: 'mqtt://broker.hivemq.com' },
  },

  work: function(my) {
    my.server.subscribe('rules');

    my.server.on('message', function (topic, data) {      
      console.log('hi');
      var totalStrikes = 10;
      var up = true;

      while (totalStrikes > 0) {
        if (up === true) {
          piblaster.setPwm(22, 0.1 );
          up = false;
        } else {
          piblaster.setPwm(22, 0.2 );
          up = true;
        }

        totalStrikes--;
      }
    });
  }
}).start();
