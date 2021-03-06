var inspect = require( 'sys' ).inspect;


function SyslogMessage( options )
{
  this.priority = options[1];
  this.time = options[2] || 0;
  this.host = options[3] || "";
  this.msg = options[4];

  this.year = new Date().getUTCFullYear();

};

SyslogMessage.prototype.message = function()
{
  return this.msg;
};

SyslogMessage.prototype.facility = function()
{
  return this.priority.charAt( 0 );
};

SyslogMessage.prototype.level = function()
{
  return this.priority.charAt( 1 );
};

SyslogMessage.prototype.time = function()
{
  return this.time;
};

SyslogMessage.prototype.date = function()
{

  var d = new Date( this.time );
  d.setUTCFullYear( this.year );
  console.log( "Date: " + inspect( d ) );
  return d;

};


var Parser = function Parser()
{
  this.rfc3164_re = /<(\d{1,3})>[\d{1,}: \*]*((?:[JFMASONDjfmasond]\w\w) {1,2}(?:\d+)(?: \d{4})* (?:\d{2}:\d{2}:\d{2}[\.\d{1,3}]*)(?: [A-Z]{1,3})*)?:*\s*(?:((?:[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(?:[a-zA-Z\-]+)) )?(.*)/;
  this.default_parser = this.rfc3164;
};

Parser.prototype.rfc3164 = function( input )
{
  var self = this;
  var results = self.rfc3164_re.exec( input );
  if( results == null )
  {
    throw new Error( "Failed to parse" );
  }
  return( new SyslogMessage( results ) );
};


Parser.prototype.parseit = function( input )
{
  var self = this;
  return self.default_parser( input );
};

module.exports = new Parser();
