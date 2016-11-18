var Cylon = require("Cylon");

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
      var angle = 30,
          increment = 40;

      every((1).seconds(), function() {
        angle += increment;
        my.servo.angle(angle);
        console.log("Current Angle: " + (my.servo.currentAngle()));

        if ((angle === 30) || (angle === 150)) { increment = -increment; }
      });
    });
  }
}).start();