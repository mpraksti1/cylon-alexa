var Cylon = require("cylon");

var piblaster = require('pi-blaster.js');

Cylon.robot({
    connections: {
        server: { name: 'pi', adaptor: 'mqtt', host: 'mqtt://broker.hivemq.com' },
    },

    devices: {
        servo: {
            driver: "servo",
            pin: 11,
            limits: { bottom: 20, top: 160 }
        }
    },

    work: function(my) {
        my.server.subscribe('rules');

        my.server.on('message', function (topic, data) {      
            console.log('hi');
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
