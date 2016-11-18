var Cylon = require("cylon");

Cylon.robot({
  connections: {
    server: { name: 'pi', adaptor: 'mqtt', host: 'mqtt://broker.hivemq.com' },
    raspi: { name: 'servo', adaptor: 'raspi' }
  },

  devices: {
    servo: { driver: 'servo', pin: 11, limits: { bottom: 20, top: 160 } }
  },

  work: function(my) {
    my.server.subscribe('rules');

    my.server.on('message', function (topic, data) {      
      my.servo.angle(45);
    });
  }
}).start();