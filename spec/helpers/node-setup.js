// Setup for running Mocha via Node
require( "should/should" );
require( "traceur" );

global._ = require( "lodash" );

var postal = require( "postal" );
global.postal = require( "../../lib/postal.linked-channels.js" )( postal );
