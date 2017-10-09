// Load app modules.
import constant from '.../src/constant'
import inputProcessor from '.../src/input_processor'
import { general as generalStorage } from '.../src/storage'
import { sendRequestXhr } from '.../src/utility'
import * as validate from '.../src/validate'

export default (data: {
	key?: string,
	attributes?: {
		[key: string]: string,
	},
	callback?: (xhr: XMLHttpRequest | null, err?: Error) => void,
} = {}) => {
	// Extract and validate the inputs.
	const inputs = inputProcessor(data, {
		key: {
			validator: validate.positiveIntegerString,
			default: generalStorage.run_event_key,
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

	// Send the request.
	sendRequestXhr(`https://${constant.apiHostname}/run_event/update`, {
		payload: {
			key: inputs.key,
			attributes: inputs.key,
		},
	}, inputs.callback)
}
