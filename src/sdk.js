(function (_window, _document, _console) {
	// Verify whether the library was loaded correctly.
	if (!_window.BuffPanelSdk) {
		throw new Error('The BuffPanel SDK was not loaded correctly.');
	}

	// TODO: Bundle an external library.
	// Define utility functions.
	function getQueryParameterByName(name) {
		var url = _window.location.href;
		name = name.replace(/[\[\]]/g, '\\$&');

		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
		var results = regex.exec(url);
		if (!results || !results[2]) {
			return null;
		}

		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	// Store BuffPanel specific data.
	var buffPanelData = {
		isLoaded: false,
		gameToken: null,
		clickEventKey: null,
		collectData: function () {
			this.clickEventKey = getQueryParameterByName('buffpanel_cek');
			this.isLoaded = !!this.gameToken && !!this.clickEventKey;
		}
	};

	// Store Google Analytics specific data.
	var googleAnalyticsData = {
		isLoaded: false,
		trackingId: null,
		clientId: null,
		collectData: function () {
			if (!_window.ga) {
				return;
			}

			_window.ga(function (tracker) {
				googleAnalyticsData.trackingId = tracker.get('trackingId');
				googleAnalyticsData.clientId = tracker.get('clientId');
			});

			this.isLoaded = !!this.trackingId && !!this.clientId;
		}
	};

	// Store Facebook Pixel specific data.
	var facebookPixelData = {
		isLoaded: false,
		pixelId: null,
		collectData: function () {
			if (!_window.fbq || !_window.fbq.loaded) {
				return;
			}

			this.pixelId = Object.keys(_window.fbq.instance.pixelsByID)[0];

			this.isLoaded = !!this.pixelId;
		}
	};

	// Define the internal properties.
	var interal = {
		urlBase: 'http://buffpanel.com/api/',
		log: [],
		sendRequest: function (url) {
			var date = new Date();

			var image = _document.createElement('img');
			image.onload = function () {
				interal.log.push({
					success: true,
					data: date,
					url: url
				});
			};
			image.onerror = function (err) {
				interal.log.push({
					success: false,
					data: date,
					url: url,
					err: err
				});
			};
			image.src = url;
		},
	};

	// Define library methods.
	var methods = {
		initialize: function (gameToken) {
			buffPanelData.gameToken = gameToken;
			buffPanelData.isLoaded = buffPanelData.gameToken && buffPanelData.clickEventKey;
		},
		sendTrackingData: function () {
			var params = {};

			if (!buffPanelData.isLoaded) {
				return;
			}
			params.bp_gt = buffPanelData.gameToken;
			params.bp_cek = buffPanelData.clickEventKey;

			if (googleAnalyticsData.isLoaded) {
				params.ga_tid = googleAnalyticsData.trackingId;
				params.ga_cid = googleAnalyticsData.clientId;
			}

			if (facebookPixelData.isLoaded) {
				params.fb_pid = facebookPixelData.pixelId;
			}

			var paramNames = Object.keys(params);
			if (paramNames.length === 2) {
				return;
			}

			internal.sendRequest(interal.urlBase + 'tracking_data?' + paramNames.map(function (paramName) {
				return paramName + '=' + params[paramName];
			}).join('&'));
		},
		trackClickEvent: function (data) {
			// TODO: Implement.
		},
		trackRunEvent: function (data) {
			// TODO: Implement.
		}
	};

	// Define the on load callback.
	_window.onload = function () {
		// Collect all available data.
		buffPanelData.collectData();
		googleAnalyticsData.collectData();
		facebookPixelData.collectData();

		// Define the request processor.
		function processRequest(type, data) {
			if (!(type in methods)) {
				throw new Error('The method "' + type + '" is not supported.');
			}
			methods[type](data);
		};

		// Process any queued requests.
		_window.BuffPanelSdk.q.forEach(function (queuedEntry) {
			processRequest(queuedEntry.type, queuedEntry.data);
		});

		// Add an output log method.
		processRequest.outputLog = function () {
			interal.log.forEach(function (logEntry) {
				_console.log(logEntry);
			});
		};

		// Expose the sdk interface.
		_window.BuffPanelSdk = processRequest;
	};
})(window, document, console);
