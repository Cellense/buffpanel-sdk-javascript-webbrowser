// Load app modules.
import updateRunEventAction from '.../src/action/update/run_event'
import * as storage from '.../src/storage'

export default (data: {
	key?: string,
} = {}) => {
	updateRunEventAction({
		key: data.key,
		attributes: ([
			['facebook_pixel_pixel_id', storage.facebookPixel.pixel_id],
			['google_analytics_client_id', storage.googleAnalytics.client_id],
			['google_analytics_tracking_id', storage.googleAnalytics.tracking_id],
		] as [string, string | undefined][]).reduce((attributes, tupple) => {
			if (tupple[1]) {
				attributes[tupple[0]] = tupple[1]
			}
			return attributes
		}, {}),
	})
}
