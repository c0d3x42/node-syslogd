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
    var msg = parser.parseit( msg );
    console.log( "Parsed: " + inspect( msg ) );
    console.log( "received facility: " + msg.facility() + " level: " + msg.level() );
    console.log( "received message: " + msg.message() );
    console.log( "date: " + inspect( msg.date().getTime() ) );
    args.message( msg );
  });

  srv.bind( this.port );
  started_cb();
};

module.exports = new Server();
