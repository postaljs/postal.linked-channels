/* global describe, postal, it, after, before, expect */

describe( "linked channels", function() {
	describe( "When binding channel - one source to one destination", function() {
		describe( "with only channel values provided", function() {
			var destData = [],
				destEnv = [],
				linkages;
			before( function() {
				linkages = postal.linkChannels( { channel: "sourceChannel" }, { channel: "destinationChannel" } );
				subscription = postal.subscribe( { channel: "destinationChannel", topic: "Oh.Hai.There", callback: function( data, env ) {
						destData.push( data );
						destEnv.push( env );
				} } );
				postal.publish( { channel: "sourceChannel", topic: "Oh.Hai.There", data: "I'm in yer bus, linkin' to yer subscriptionz..." } );
				linkages[ 0 ].unsubscribe();
				postal.publish( { channel: "sourceChannel", topic: "Oh.Hai.There", data: "I'm in yer bus, linkin' to yer subscriptionz..." } );
			} );
			after( function() {
				postal.reset();
			} );
			it( "linked subscription should only have been invoked once", function() {
				destData.length.should.equal( 1 );
				destEnv.length.should.equal( 1 );
			} );
			it( "linked subscription data should match expected results", function() {
				destData[ 0 ].should.equal( "I'm in yer bus, linkin' to yer subscriptionz..." );
			} );
			it( "linked subscription envelope should match expected results", function() {
				destEnv[ 0 ].channel.should.equal( "destinationChannel" );
				destEnv[ 0 ].topic.should.equal( "Oh.Hai.There" );
			} );
		} );
		describe( "with channel and static topic values provided", function() {
			var destData = [],
				destEnv = [],
				linkages;
			before( function() {
				linkages = postal.linkChannels( { channel: "sourceChannel", topic: "Oh.Hai.There" }, { channel: "destinationChannel", topic: "kthxbye" } );
				subscription = postal.subscribe( { channel: "destinationChannel", topic: "kthxbye", callback: function( data, env ) {
						destData.push( data );
						destEnv.push( env );
				} } );
				postal.publish( { channel: "sourceChannel", topic: "Oh.Hai.There", data: "I'm in yer bus, linkin' to yer subscriptionz..." } );
				linkages[ 0 ].unsubscribe();
				postal.publish( { channel: "sourceChannel", topic: "Oh.Hai.There", data: "I'm in yer bus, linkin' to yer subscriptionz..." } );
			} );
			after( function() {
				postal.reset();
			} );
			it( "linked subscription should only have been invoked once", function() {
				destData.length.should.equal( 1 );
				destEnv.length.should.equal( 1 );
			} );
			it( "linked subscription data should match expected results", function() {
				destData[ 0 ].should.equal( "I'm in yer bus, linkin' to yer subscriptionz..." );
			} );
			it( "linked subscription envelope should match expected results", function() {
				destEnv[ 0 ].channel.should.equal( "destinationChannel" );
				destEnv[ 0 ].topic.should.equal( "kthxbye" );
			} );
		} );
		describe( "with channel and topic transform values provided", function() {
			var destData = [],
				destEnv = [],
				linkages;
			before( function() {
				linkages = postal.linkChannels( { channel: "sourceChannel" }, { channel: "destinationChannel", topic: function( tpc ) {
						return "NewTopic." + tpc;
				} } );
				subscription = postal.subscribe( { channel: "destinationChannel", topic: "NewTopic.Oh.Hai.There", callback: function( data, env ) {
						destData.push( data );
						destEnv.push( env );
				} } );
				postal.publish( { channel: "sourceChannel", topic: "Oh.Hai.There", data: "I'm in yer bus, linkin' to yer subscriptionz..." } );
				linkages[ 0 ].unsubscribe();
				postal.publish( { channel: "sourceChannel", topic: "Oh.Hai.There", data: "I'm in yer bus, linkin' to yer subscriptionz..." } );
			} );
			after( function() {
				postal.reset();
			} );
			it( "linked subscription should only have been invoked once", function() {
				destData.length.should.equal( 1 );
				destEnv.length.should.equal( 1 );
			} );
			it( "linked subscription data should match expected results", function() {
				destData[ 0 ].should.equal( "I'm in yer bus, linkin' to yer subscriptionz..." );
			} );
			it( "linked subscription envelope should match expected results", function() {
				destEnv[ 0 ].channel.should.equal( "destinationChannel" );
				destEnv[ 0 ].topic.should.equal( "NewTopic.Oh.Hai.There" );
			} );
		} );
	} );
	describe( "When binding channel - one source to multiple destinations", function() {
		var destData = [],
			destEnv = [],
			callback = function( data, env ) {
				destData.push( data );
				destEnv.push( env );
			};

		before( function() {
			linkages = postal.linkChannels(
				{ channel: "sourceChannel", topic: "Oh.Hai.There" },
				[
					{ channel: "destinationChannel", topic: "NewTopic.Oh.Hai" },
					{ channel: "destinationChannel", topic: "NewTopic.Oh.Hai.There" }
				] );
			postal.subscribe( { channel: "destinationChannel", topic: "NewTopic.Oh.Hai", callback: callback } );
			postal.subscribe( { channel: "destinationChannel", topic: "NewTopic.Oh.Hai.There", callback: callback } );
			postal.publish( { channel: "sourceChannel", topic: "Oh.Hai.There", data: "I'm in yer bus, linkin' to yer subscriptionz..." } );
		} );
		after( function() {
			postal.reset();
		} );
		it( "linked subscriptions should each have been called once", function() {
			destData.length.should.equal( 2 );
			destEnv.length.should.equal( 2 );
		} );
	} );
} );
