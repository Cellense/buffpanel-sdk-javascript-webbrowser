import {
	positiveIntegerString as validatePositiveIntegerString,
	stringToStringObject as validateStringToStringObject,
} from '.../src/validate'

export default (data: {
	key?: string,
	attributes?: {
		[key: string]: string,
	},
} = {}) => {
	if (!validateStringToStringObject(attributes)) {
		throw new Error('The "attributes" parameter is invalid')
	}
}
