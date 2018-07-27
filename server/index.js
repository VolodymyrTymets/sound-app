var app = require('./app');
var debug = require('debug')('server:server');
var http = require('http');
const os = require('os');
var ifaces = os.networkInterfaces();
const socets = require('./events');

const startServer = (PORT) => {

  /**
   * Get port from environment and store in Express.
   */

  var port = normalizePort(PORT || '3000');
  app.set('port', port);

  /**
   * Create HTTP server.
   */

  var server = http.createServer(app, () => console.log);

  /**
   * Init Socket io
   */

  socets(server);


  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port, (arg) => {
    let host = '';
    Object.keys(ifaces).forEach(function (ifname) {
      var alias = 0;

      ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }

        if (alias >= 1) {
          // this single interface has multiple ipv4 addresses
          host = `${ifname} :${alias}${iface.address}`;
        } else {
          // this interface has only one ipv4 adress
          host = `${ifname} ${iface.address}`;
        }
        ++alias;
      });
    });

    console.log(`Server listening on ${host}:${port} ...`)
  });
  server.on('error', onError);
  server.on('listening', onListening);

  /**
   * Normalize a port into a number, string, or false.
   */

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
};

module.exports = { startServer };


