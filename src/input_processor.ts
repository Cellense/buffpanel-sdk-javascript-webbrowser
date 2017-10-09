// Load app modules.
import { nonEmptyString } from '.../src/validate'

/**
 * Processes the input object (a mapping of string to any value), by validating it against the validation configuration.
 * The validation configuration may specify default entries for missing values.
 * The resulting validated object is returned, any entries not included in the validation configuration are not included.
 * @param inputObject A collection of names values to be processed.
 * @param validationConfig An object describing default values, whether the entry is optional and which validator function to use.
 */
export default (inputObject: object, validationConfig: {
	[key: string]: {
		validator: (value: any) => boolean,
		default?: any,
		optional?: boolean,
	},
}) => {
	// Validate the sent data.
	if ((typeof inputObject !== 'object') || (inputObject === null)) {
		throw new Error('The parameters must be sent as an object.')
	}

	return Object.keys(validationConfig).reduce((acc, name) => {
		if (!nonEmptyString(name)) {
			throw new Error('The validation configuration is invalid.')
		}

		const validationConfigItem = validationConfig[name]

		const value = inputObject[name] !== undefined
			? inputObject[name]
			: validationConfigItem.default

		if (value === undefined) {
			if (validationConfigItem.optional === true) {
				return acc
			}

			throw new Error(`The "${name}" parameter is missing.`)
		}

		if (!validationConfigItem.validator(value)) {
			throw new Error(`The "${name}" parameter is invalid.`)
		}

		return {
			...acc,
			[name]: value,
		}
	}, {})
}
