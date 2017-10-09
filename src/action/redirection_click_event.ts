// Load app modules.
import constant from '.../src/constant'
import inputProcessor from '.../src/input_processor'
import { general as generalStorage } from '.../src/storage'
import {
	generateSearchParameters,
	sendRequestImg,
} from '.../src/utility'
import * as validate from '.../src/validate'

export default (data: {
	game_token?: string,
	campaign_token?: string,
	measurement_url_token?: string,
	attributes?: {
		[key: string]: string,
	},
	callback?: (err?: object) => void,
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
		callback: {
			validator: validate.functionObject,
			optional: true,
		},
	}) as typeof data

	// Prepare and send the request.
	sendRequestImg(`http://${inputs.game_token}.${constant.redirectionHostname}/${inputs.campaign_token}/${inputs.measurement_url_token}`
		+ generateSearchParameters({
			...inputs.attributes as { [key: string]: string },
			sdk_version: constant.sdkVersion,
		}), inputs.callback)
}
