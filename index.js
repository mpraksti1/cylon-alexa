var Cylon = require("cylon");

Cylon.robot({
  connections: {
    server: { adaptor: 'mqtt', host: 'mqtt://broker.hivemq.com' },
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    servo: { driver: 'servo', pin: 11 }
  }

  work: function(my) {
    my.server.subscribe('rules');

    my.server.on('message', function (topic, data) {      
      var angle = 45 ;
      
      my.servo.angle(angle);
      
      every((1).second(), function() {
        angle = angle + 45 ;
        if (angle > 135) {
          angle = 45
        }
        my.servo.angle(angle);
      });
    });
  }
}).start();