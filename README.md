#postal.linked-channels
##v0.1.1

###What Is It?
This behavior used to live in the core [postal.js]() library, but was pulled out to live in an add-on as of postal.js v0.11.0. If you're using an earlier version of postal than that, you won't need this add-on. However, if you still want to be able to link channels and you're on postal v0.11 or greater, you'll need to include this in your project.

###How to Include It
####AMD
```javascript
	define([
		"postal.linked-channels"
	], function(postal) {
		// postal will be the postal namespace,
		// with `linkChannels` method added to it
	})
```

####CommonJS
```javascript
	// the CommonJS export returns a factory
	// to which postal must be passed. (All
	// postal add-ons work this way, allowing
	// you to control the instance of postal
	// being modified/extended)
	var p = require("postal");
	var postal = require("postal.linked-channels")(p);
```

####Plain Browser
If you're not using AMD or CommonJS modules, just include the `script` tag sourcing postal.linked-channels after postal & lodash.

###How to Use It
The postal.js wiki has API information on this add-on [here](https://github.com/postaljs/postal.js/wiki/postal.linkChannels).

###Building/Tests

* To run tests: `npm test`
* To run istanbul (code coverage): `npm run coverage`
* To show a browser-based istanbul report: `npm run show-coverage`
* To run a build (generates lib directory assets): `npm run build`
* To run a build & start the local project runner: `npm start`

