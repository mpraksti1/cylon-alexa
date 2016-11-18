var Cylon = require("Cylon");

Cylon.robot({
  connections: {
    server: { adaptor: 'mqtt', host: 'mqtt://broker.hivemq.com' }
  },

  work: function(my) {
    my.server.subscribe('rules');

    my.server.on('message', function (topic, data) {
      console.log(topic + ": " + data);
    });
  }
}).start();