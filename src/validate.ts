export const nonEmptyString = (value) => {
	return (typeof value === 'string') && (value !== '')
}

const positiveIntegerStringRegex = /^[1-9][0-9]*$/
export const positiveIntegerString = (value) => {
	return nonEmptyString(value) && stringPositiveIntegerRegex.test(value)
}

export const stringToStringObject = (value) => {
	if (typeof value !== 'object') {
		return false
	}

	return Object.keys(value).every((name) => {
		return (typeof name === 'string') && (typeof value[name] === 'string')
	})
}
