// Load local modules.
import constant from '.../src/constant'
import inputProcessor from '.../src/input_processor'
import { general as generalStorage } from '.../src/storage'
import { sendRequestXhr } from '.../src/utility'
import * as validate from '.../src/validate'

export default (data: {
	game_token?: string,
	campaign_token?: string,
	measurement_url_token?: string,
	attributes?: {
		[key: string]: string,
	},
	timestamp?: Date,
	ip_address?: string,
	http_headers?: {
		[key: string]: string,
	},
	callback?: (xhr: XMLHttpRequest | null, err?: Error) => void,
} = {}) => {
	// Extract and validate the inputs.
	const inputs = inputProcessor(data, {
		game_token: {
			validator: validate.nonEmptyString,
			default: generalStorage.game_token,
		},
		campaign_token: {
			validator: validate.nonEmptyString,
			default: generalStorage.campaign_token,
		},
		measurement_url_token: {
			validator: validate.nonEmptyString,
			default: generalStorage.measurement_url_token,
		},
		attributes: {
			validator: validate.stringToNonEmptyStringObject,
			default: {},
		},
		timestamp: {
			validator: validate.dateObject,
			optional: true,
		},
		ip_address: {
			validator: validate.nonEmptyString,
			optional: true,
		},
		http_headers: {
			validator: validate.stringToStringObject,
			optional: true,
		},
		callback: {
			validator: validate.functionObject,
			optional: true,
		},
	}) as typeof data

	// Send the request.
	sendRequestXhr(`https://${constant.apiHostname}/click_event/create`, {
		payload: {
			game_token: inputs.game_token,
			campaign_token: inputs.campaign_token,
			measurement_url_token: inputs.measurement_url_token,
			attributes: {
				...inputs.attributes,
				sdk_version: constant.sdkVersion,
			},
			timestamp_ms: inputs.timestamp !== undefined
				? inputs.timestamp.getTime()
				: undefined,
			ip_address: inputs.ip_address,
			http_headers: inputs.http_headers,
		},
	}, inputs.callback)
}
