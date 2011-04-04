
var server = require( './server' );
var inspect = require( 'sys' ).inspect;

function started_cb()
{
  console.log( "Syslog has started" );
};

var Syslog = function Syslog()
{
  server.start( { message:function( msg )
  {
    console.log( "RECV msg: " + inspect( msg ) );
  } }, started_cb );
};

Syslog.prototype.init = function( args, cb )
{
  
};

module.exports = new Syslog();
