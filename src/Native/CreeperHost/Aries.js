// Largely modeled after elm-http's native.
// Subject to breakages without notice due to compiler changes, etc, etc.

Elm.Native.CreeperHost = Elm.Native.CreeperHost || {};
Elm.Native.CreeperHost.Aries = {};
Elm.Native.CreeperHost.Aries.make = function makeAries( localRuntime ) {
	// NOTE: Node style import.
	var Aries = require( 'creeperhost-aries' );

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.CreeperHost = localRuntime.Native.CreeperHost || {};
	localRuntime.Native.CreeperHost.Aries = localRuntime.Native.CreeperHost.Aries || {};

	if( localRuntime.Native.CreeperHost.Aries.values ) {
		return localRuntime.Native.CreeperHost.Aries.values;
	}

	// other imports?
	var Task = Elm.Native.Task.make( localRuntime );

	function send( key, secret, section, command, parameters ) {
		var data = {};

		for( var i = 0; i < parameters.length; ++i ) {
			data[ parameters._0 ] = data[ parameters._1 ];
		}

		return Task.asyncFunction( function( callback ) {
			(new Aries( key, secret )).exec( section, command, data, function( parsedResponse, responseStream, rawResponse ) {
				if( responseStream.statusCode !== 200 ) {
					// non-OK status...
					return callback( Task.fail({ ctor: 'StatusError', _0: responseStream.statusCode }) );
				}

				if( parsedResponse.status !== 'success' ) {
					// non-successful execution
					return callback( Task.fail({ ctor: 'APIError', _0: parsedResponse.message }) );
				}

				// success!
				// do some property testing to determine type.

				function has( object, propNames ) {
					for( var i = 0; i < propNames.length; ++i ) {
						if( object.hasOwnProperty( propNames ) )
							continue;
						else
							return false;
					}

					return true;
				}

				if( has( parsedResponse, [ 'log', 'count' ] ) ) {
					return callback( Task.succeed({
						ctor: 'LogResponse',
						_0: parsedResponse
					}));
				}
				// else if( has( parsedResponse, [ 'uuid' ] ) ) {
				// 	return callback( Task.succeed({
				// 		ctor: 'TimedItemResponse',
				// 		_0: parsedResponse
				// 	}));
				// }
				else {
					return callback( Task.succeed({
						ctor: 'GeneralResponse',
						_0: parsedResponse
					}));
				}
			});
		});
	}
}
