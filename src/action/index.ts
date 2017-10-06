

export default (name: string, data: any) => {
	switch (name) {
		case 'initialize':
			initialize
			break
	}

	initialize(gameToken) {
		storage.gameToken = gameToken
	},
	sendTrackingData() {
		var params = {}

		if (!storage.isLoaded) {
			return
		}
		params.bp_gt = storage.gameToken
		params.bp_cek = storage.clickEventKey || 47

		if (googleAnalyticsData.isLoaded) {
			params.ga_tid = googleAnalyticsData.trackingId
			params.ga_cid = googleAnalyticsData.clientId
		}

		if (facebookPixelData.isLoaded) {
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
	trackClickEvent(data) {
		// TODO: Implement.
	},
	trackRunEvent(data) {
		// TODO: Implement.
	},
}
