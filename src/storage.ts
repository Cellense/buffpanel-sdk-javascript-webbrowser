/**
 * The storage for information used to communicate with the BuffPanel service.
 */
export const general: {
	game_token?: string,
	campaign_token?: string,
	measurement_url_token?: string,
	player_token?: string,
	click_event_key?: string,
	run_event_key?: string,
} = {}

/**
 * The storage for information used to integrate with the Google Analytics service.
 */
export const googleAnalytics: {
	tracking_id?: string,
	client_id?: string,
} = {}

/**
 * The storage for information used to integrate with the Facebook Pixel service.
 */
export const facebookPixel: {
	pixel_id?: string,
} = {}
