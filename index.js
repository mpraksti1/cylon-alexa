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
      piblaster.setPwm(22, 0.1 );
    });
  }
}).start();
