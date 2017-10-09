// Load app modules.
import * as storage from '.../src/storage'
import { getSearchParameter } from '.../src/utility'

/**
 * Populates the general storage data.
 */
export const general = () => {
	// Define a unified data value extractor.
	const processDataValue = (searchParameterName: string, storageName: string) => {
		const value = getSearchParameter(searchParameterName)
		if ((value !== null) && (value !== '')) {
			storage.general[storageName] = value
		}
	}

	// Process the event keys.
	processDataValue('buffpanel_cek', 'click_event_key')
	processDataValue('buffpanel_rek', 'run_event_key')
}

/**
 * Populates the google analytics integration data.
 */
export const googleAnalytics = () => {
	const googleAnalyticsObj = window['ga']
	if (!googleAnalyticsObj) {
		return
	}

	if (typeof googleAnalyticsObj.getAll !== 'function') {
		return
	}

	const trackers = googleAnalyticsObj.getAll()
	if (!trackers) {
		return
	}

	const tracker = trackers[0]
	if (!tracker) {
		return
	}

	if (typeof tracker.get !== 'function') {
		return
	}

	storage.googleAnalytics.tracking_id = tracker.get('trackingId')
	storage.googleAnalytics.client_id = tracker.get('clientId')
}

/**
 * Populates the facebook pixel integration data.
 */
export const facebookPixel = () => {
	const facebookPixelObj = window['fbq']
	if (!facebookPixelObj) {
		return
	}

	if (!facebookPixelObj.loaded) {
		return
	}

	const instance = facebookPixelObj.instance
	if (!instance) {
		return
	}

	storage.facebookPixel.pixel_id = Object.keys(instance.pixelsByID)[0]
}

/**
 * Calls all populate methods.
 */
export default () => {
	general()
	googleAnalytics()
	facebookPixel()
}
