var dgram = require( 'dgram' );
var inspect = require( 'sys' ).inspect;
var parser = require( './parser' );

var Server = function Server()
{
  this.port = 1514;
  this.srv = undefined;
};

Server.prototype.start = function( args, started_cb )
{
  var self = this;
  var srv = this.srv = dgram.createSocket( 'udp4' );
  srv.on( 'listening', function( )
  {
    var address = srv.address();
    console.log( "Listening... " + address.address + ":" + address.port );
  });

  srv.on( 'message', function( msg, rinfo )
  {
    var parsed = parser.rfc3164( msg );
    console.log( "Parsed: " + inspect( parsed ) );
    console.log( "received message: " + parsed.message() );
    args.message( msg );
  });

  srv.bind( this.port );
  started_cb();
};

module.exports = new Server();
