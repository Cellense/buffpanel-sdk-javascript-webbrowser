/**
 * Checks if the value is of type boolean.
 * @param value The value to be validated.
 */
export const booleanValue = (value) => {
	return typeof value === 'boolean'
}

/**
 * Checks if the value is of type string and is non-empty.
 * @param value The value to be validated.
 */
export const nonEmptyString = (value) => {
	return (typeof value === 'string') && (value !== '')
}

/**
 * Checks if the value is of type string and contains a positive integer.
 * @param value The value to be validated.
 */
const positiveIntegerStringRegex = /^[1-9][0-9]*$/
export const positiveIntegerString = (value) => {
	return nonEmptyString(value) && positiveIntegerStringRegex.test(value as string)
}

/**
 * Checks if the value is a plain object whose every entry is a string to string mapping.
 * @param value The value to be validated.
 */
export const stringToStringObject = (value) => {
	if (typeof value !== 'object') {
		return false
	}

	return Object.keys(value).every((name) => {
		return (typeof name === 'string') && (typeof value[name] === 'string')
	})
}

/**
 * Checks if the value is a plain object whose every entry is a string to non-empty string mapping.
 * @param value The value to be validated.
 */
export const stringToNonEmptyStringObject = (value) => {
	if (typeof value !== 'object') {
		return false
	}

	return Object.keys(value).every((name) => {
		return (typeof name === 'string') && nonEmptyString(value[name])
	})
}

/**
 * Checks if the value is a plain object whose every entry is a string to positive integer string array or null mapping.
 * @param value The value to be validated.
 */
export const stringToPositiveIntegerStringArrayOrNullObject = (value) => {
	if (typeof value !== 'object') {
		return false
	}

	return Object.keys(value).every((name) => {
		if (!nonEmptyString(name)) {
			return false
		}

		const entryValue = value[name]
		if (entryValue === null) {
			return true
		}

		if (Object.prototype.toString.call(entryValue) !== '[object Array]') {
			return false
		}
		return (entryValue as any[]).every((entryValueItem) => {
			return positiveIntegerString(entryValueItem)
		})
	})
}

/**
 * Checks if the value is a date object.
 * @param value The value to be validated.
 */
export const dateObject = (value) => {
	return Object.prototype.toString.call(value) === '[object Date]'
}

/**
 * Checks if the value is a function object.
 * @param value The value to be validated.
 */
export const functionObject = (value) => {
	return typeof value === 'function'
}
