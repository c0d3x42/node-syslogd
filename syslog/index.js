
var server = require( './server' );
//var parser = require(' ./parser' );

function started_cb()
{
  console.log( "Syslog has started" );
};

var Syslog = function Syslog()
{
  server.start( { message:function( msg )
  {

  } }, started_cb );
};

Syslog.prototype.init = function( args, cb )
{
  
};

module.exports = new Syslog();
