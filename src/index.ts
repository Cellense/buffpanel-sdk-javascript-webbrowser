// Load app modules.
import * as constant from '.../src/constant'
import * as storage from '.../src/storage'
import * as utility from '.../src/utility'

// Verify whether the library was loaded correctly.
if (!window['BuffPanelSdk']) {
	throw new Error('The BuffPanel SDK was not loaded correctly.');
}

// Define the internal properties.
var internal = {
	urlBase: `'https://${constant}`,
	log: [],
	sendRequest: function (url) {

	},
};

// Define library methods.
var methods = {
	initialize: function (gameToken) {
		storage.gameToken = gameToken;
		storage.isLoaded = storage.gameToken;
	},
	sendTrackingData: function () {
		var params = {};

		if (!storage.isLoaded) {
			return;
		}
		params.bp_gt = storage.gameToken;
		params.bp_cek = storage.clickEventKey || 47;

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

		internal.sendRequest(internal.urlBase + 'tracking_data?' + paramNames.map(function (paramName) {
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

// Define the initialization callback.
function initialize() {
	// Collect all available data.
	storage.collectData();
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
	delete _window.BuffPanelSdk.q;

	// Add an output log method.
	processRequest.outputLog = function () {
		internal.log.forEach(function (logEntry) {
			_console.log(logEntry);
		});
	};

	// Expose the sdk interface.
	_window.BuffPanelSdk = processRequest;
};

// Ensure the initialization is triggered.
if (_document.readyState === 'complete') {
	initialize();
} else {
	_window.onload = initialize;
}
