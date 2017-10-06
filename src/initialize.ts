// Load app modules.
import * as storage from '.../src/storage'
import * as utility from '.../src/utility'

export const general = () => {
	const reffererClickEventKey = utility.getQueryParameterByName('buffpanel_cek')
	if (reffererClickEventKey) {
		storage.general.refferer_click_event_key = reffererClickEventKey
	}
}

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

export default () => {
	general()
	googleAnalytics()
	facebookPixel()
}
