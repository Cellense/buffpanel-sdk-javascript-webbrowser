(function (_window, _document, _console) {
	// Verify whether the library was loaded correctly.
	if (!_window.BuffPanelSdk) {
		throw new Error('The BuffPanel SDK was not loaded correctly.')
	}

	// TODO: Bundle an external library.
	// Define a function to parse a single query parameters value, when given its name.
	function getQueryParameterByName(url, name) {
		name = name.replace(/[\[\]]/g, '\\$&')

		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
		var results = regex.exec(url)
		if (!results || !results[2]) {
			return null
		}

		return decodeURIComponent(results[2].replace(/\+/g, ' '))
	}
/*
	// Define a general function for sending async http requests.
	function sendHttpRequest(options) {
		// Collect the parameters.
		var params = {
			url: options.url || null,
			method: options.method || null,
			headers: options.headers || {},
			callback: options.callback || null,
			payload: options.payload || null,
		}

		// Check if the required parameters are present.
		if (params.url === null) {
			throw new Error('No url was supplied.')
		}
		if (params.method === null) {
			throw new Error('No method was supplied.')
		}

		// Initialize the xhr object.
		var xhr = new XMLHttpRequest()

		// Set headers if they are supplied.
		Object.keys(params.headers).forEach((headerName) => {
			xhr.setRequestHeader(headerName, headerName[headers])
		})

		// Setup the callback if available.
		if (params.callback) {
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					params.callback(xhr)
				}
			}
		}
		
		// Open the connection.
		xhr.open(params.method, params.url, true)

		// Send the request with the payload.
		xhr.send(params.payload)
	}
*/
	// Store BuffPanel specific data.
	var buffPanelData = {
		gameToken: null,
		campaignToken: 'test_1',
		clickEventKey: null,
		isLoaded: function () {
			// Check if all conditions are met to consider the module loaded.
			return !!this.gameToken && (!!this.campaignToken || !!this.clickEventKey)
		},
		collectData: function () {
			// Attempt to extract the click event key from the current
			this.clickEventKey = getQueryParameterByName(_window.location.href, 'buffpanel_cek')
		}
	}

	// Store Google Analytics specific data.
	var googleAnalyticsData = {
		trackingId: null,
		clientId: null,
		isLoaded: function () {
			// Check if all conditions are met to consider the module loaded.
			return !!this.trackingId && !!this.clientId
		},
		collectData: function () {
			if (!_window.ga || !_window.ga.getAll) {
				return
			}

			var trackers = _window.ga.getAll()
			if (!trackers || !trackers[0]) {
				return
			}

			var tracker = trackers[0]
			if (!tracker.get) {
				return
			}

			this.trackingId = tracker.get('trackingId')
			this.clientId = tracker.get('clientId')
		}
	}

	// Store Facebook Pixel specific data.
	var facebookPixelData = {
		pixelId: null,
		isLoaded: function () {
			return !!this.pixelId
		},
		collectData: function () {
			if (!_window.fbq || !_window.fbq.loaded) {
				return
			}

			this.pixelId = Object.keys(_window.fbq.instance.pixelsByID)[0]
		}
	}

	// Define the internal properties.
	var internal = {
		redirectHostname: 'trbt.it',
		urlBase: 'http://buffpanel.com/api/',
		log: [],
		sendRequest: function (url) {
			var date = new Date()

			var image = _document.createElement('img')
			image.onload = function () {
				internal.log.push({
					success: true,
					data: date,
					url: url
				})
			}
			image.onerror = function (err) {
				internal.log.push({
					success: false,
					data: date,
					url: url,
					err: err
				})
			}
			image.src = url
		},
	}

	// Define library methods.
	var methods = {
		initialize: function (gameToken) {
			buffPanelData.gameToken = gameToken
		},
		setCamapignToken: function (campaignToken) {
			buffPanelData.campaignToken = campaignToken
		},
		sendTrackingData: function () {
			var params = {}

			if (!buffPanelData.isLoaded()) {
				return
			}
			params.bp_gt = buffPanelData.gameToken

			if (!buffPanelData.clickEventKey) {
				// Attempt to create a click event.
				internal.sendRequest('http://' + buffPanelData.gameToken + '.' + internal.redirectHostname + '/' + buffPanelData.campaignToken)
				params.bp_cek = '47'
			} else {
				params.bp_cek = buffPanelData.clickEventKey
			}

			if (googleAnalyticsData.isLoaded()) {
				params.ga_tid = googleAnalyticsData.trackingId
				params.ga_cid = googleAnalyticsData.clientId
			}

			if (facebookPixelData.isLoaded()) {
				params.fb_pid = facebookPixelData.pixelId
			}

			var paramNames = Object.keys(params)
			if (paramNames.length === 2) {
				return
			}

			internal.sendRequest(internal.urlBase + 'tracking_data?' + paramNames.map(function (paramName) {
				return paramName + '=' + params[paramName]
			}).join('&'))
		},
		trackClickEvent: function (data) {
			// TODO: Implement.
		},
		trackRunEvent: function (data) {
			// TODO: Implement.
		}
	}

	// Define the initialization callback.
	function initialize() {
		// Collect all available data.
		buffPanelData.collectData()
		googleAnalyticsData.collectData()
		facebookPixelData.collectData()

		// Define the request processor.
		function processRequest(type, data) {
			if (!(type in methods)) {
				throw new Error('The method "' + type + '" is not supported.')
			}
			methods[type](data)
		}

		// Process any queued requests.
		_window.BuffPanelSdk.q.forEach(function (queuedEntry) {
			processRequest(queuedEntry.type, queuedEntry.data)
		})
		delete _window.BuffPanelSdk.q

		// Add an output log method.
		processRequest.outputLog = function () {
			internal.log.forEach(function (logEntry) {
				_console.log(logEntry)
			})
		}

		// Expose the sdk interface.
		_window.BuffPanelSdk = processRequest
	}

	// Ensure the initialization is triggered.
	if (_document.readyState === 'complete') {
		initialize()
	} else {
		_window.onload = initialize
	}
})(window, document, console)
