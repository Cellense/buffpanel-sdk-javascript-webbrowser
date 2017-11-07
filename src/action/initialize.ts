// Load local modules.
import { general as generalStorage } from '.../src/storage'
import {
	nonEmptyString as validateNonEmptyString,
	positiveIntegerString as validatePositiveIntegerString,
} from '.../src/validate'

export default (data: {
	game_token?: string,
	campaign_token?: string,
	measurement_url_token?: string,
	player_token?: string,
	click_event_key?: string,
	run_event_key?: string,
} = {}) => {
	// Validate the sent data.
	if ((typeof data !== 'object') || (data === null)) {
		throw new Error('The parameters must be sent as an object.')
	}

	// Define a unified data value extractor.
	const processDataValue = (validation: (value: any) => boolean, key: string) => {
		// Check if key is set.
		if (key in data) {
			// Validate the key value.
			if (!validation(data[key])) {
				throw new Error(`The '${key}' parameter is invalid`)
			}

			// Store the key value.
			generalStorage[key] = data[key]
		}
	}

	// Process tokens.
	processDataValue(validateNonEmptyString, 'game_token')
	processDataValue(validateNonEmptyString, 'campaign_token')
	processDataValue(validateNonEmptyString, 'measurement_url_token')
	processDataValue(validateNonEmptyString, 'player_token')

	// Process event keys.
	processDataValue(validatePositiveIntegerString, 'click_event_key')
	processDataValue(validatePositiveIntegerString, 'run_event_key')
}
