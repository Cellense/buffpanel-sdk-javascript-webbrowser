// Load app modules.
import { redirectionHostname } from '.../src/constant'
import { general as generalStorage } from '.../src/storage'
import {
	generateSearchParameters,
	sendRequestImg,
} from '.../src/utility'
import {
	nonEmptyString as validateNonEmptyString,
	stringToStringObject as validateStringToStringObject,
} from '.../src/validate'

export default (data : {
	game_token?: string,
	campaign_token?: string,
	measurement_url_token?: string,
	attributes?: {
		[key: string]: string,
	},
	callback?: (err?: object) => void,
} = {}) => {
	// Extract the inputs.
	const gameToken = data.game_token
		? data.game_token
		: generalStorage.game_token
	const campaignToken = data.campaign_token
		? data.campaign_token
		: generalStorage.campaign_token
	const measurementUrlToken = data.measurement_url_token
		? data.measurement_url_token
		: generalStorage.measurement_url_token
	const attributes = data.attributes
		? data.attributes
		: {}

	// Validate the inputs.
	if (!validateNonEmptyString(gameToken)) {
		throw new Error('The "game_token" parameter is invalid')
	}
	if (!validateNonEmptyString(campaignToken)) {
		throw new Error('The "campaign_token" parameter is invalid')
	}
	if (!validateNonEmptyString(measurementUrlToken)) {
		throw new Error('The "measurement_url_token" parameter is invalid')
	}
	if (!validateStringToStringObject(attributes)) {
		throw new Error('The "attributes" parameter is invalid')
	}
	if (data.callback) {
		if (typeof data.callback !== 'function') {
			throw new Error('The "callback" parameter must be a function')
		}
	}

	// Prepare the request url
	const url = `http://${gameToken}.${redirectionHostname}/${campaignToken}/${measurementUrlToken}` + generateSearchParameters(attributes)

	// Send the request.
	sendRequestImg(url, (err?: object) => {
		if (data.callback) {
			data.callback(err)
		} else if (err) {
			throw err
		}
	})
}
