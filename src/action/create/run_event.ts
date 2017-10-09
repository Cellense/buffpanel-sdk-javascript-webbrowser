// Load app modules.
import constant from '.../src/constant'
import inputProcessor from '.../src/input_processor'
import { general as generalStorage } from '.../src/storage'
import { sendRequestXhr } from '.../src/utility'
import * as validate from '.../src/validate'

export default (data: {
	game_token?: string,
	player_token?: string,
	attributes?: {
		[key: string]: string,
	},
	click_event_keys?: {
		[browserId: string]: string[] | null,
	},
	is_existing_player?: boolean,
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
		player_token: {
			validator: validate.nonEmptyString,
			default: generalStorage.player_token,
		},
		attributes: {
			validator: validate.stringToNonEmptyStringObject,
			default: {},
		},
		click_event_keys: {
			validator: validate.stringToPositiveIntegerStringArrayOrNullObject,
			default: {},
		},
		is_existing_player: {
			validator: validate.booleanValue,
			optional: true,
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
	sendRequestXhr(`https://${constant.apiHostname}/run_event/create`, {
		payload: {
			game_token: inputs.game_token,
			player_token: inputs.player_token,
			attributes: {
				...inputs.attributes,
				sdk_version: constant.sdkVersion,
			},
			click_event_keys: inputs.click_event_keys,
			is_existing_player: inputs.is_existing_player,
			timestamp_ms: inputs.timestamp !== undefined
				? inputs.timestamp.getTime()
				: undefined,
			ip_address: inputs.ip_address,
			http_headers: inputs.http_headers,
		},
	}, inputs.callback)
}
