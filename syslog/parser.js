var inspect = require( 'sys' ).inspect;

var rfc3164_re = /<(\d{1,3})>[\d{1,}: \*]*((?:[JFMASONDjfmasond]\w\w) {1,2}(?:\d+)(?: \d{4})* (?:\d{2}:\d{2}:\d{2}[\.\d{1,3}]*)(?: [A-Z]{1,3})*)?:*\s*(?:((?:[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(?:[a-zA-Z\-]+)) )?(.*)/;

function SyslogMessage( options )
{
  this.priority = options[1];
  this.time = options[2] || 0;
  this.host = options[3] || "";
  this.msg = options[4];

};

SyslogMessage.prototype.message = function()
{
  return this.msg;
}


module.exports.rfc3164 = function( input )
{
  var results = rfc3164_re.exec( input );
  if( results == null )
  {
    throw new Error( "Failed to parse" );
  }
  return( new SyslogMessage( results ) );
};
