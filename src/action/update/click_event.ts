// Load app modules.
import {
	positiveIntegerString as validatePositiveIntegerString,
	stringToStringObject as validateStringToStringObject,
} from '.../src/validate'
import { general as generalStorage } from '.../src/storage'
import { sendRequestXhr } from '.../src/utility'

export default (data: {
	key?: string,
	attributes?: {
		[key: string]: string,
	},
} = {}) => {
	// Extract the inputs.
	const key = data.key
		? data.key
		: generalStorage.click_event_key
	const attributes = data.attributes
		? data.attributes
		: {}

	// Validate the inputs.
	if (!validatePositiveIntegerString(key)) {
		throw new Error('The "key" parameter is invalid')
	}
	if (!validateStringToStringObject(attributes)) {
		throw new Error('The "attributes" parameter is invalid')
	}

	sendRequestXhr

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
}
