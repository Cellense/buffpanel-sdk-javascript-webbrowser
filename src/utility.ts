export const generateSearchParameters = (searchParameters: {
	[name: string]: string,
}) => {
	const names = Object.keys(searchParameters)
	if (names.length === 0) {
		return ''
	}

	return '?' + names.map((name) => {
		return name + '=' + searchParameters[name]
	}).join('&')
}

export const getSearchParameter = (name: string) => {
	const token = name.replace(/[\[\]]/g, '\\$&')
	const regex = new RegExp(`[?&]${token}(=([^&#]*)|&|#|$)`)

	const results = regex.exec(window.location.href)
	if ((results === null) || (typeof results[2] !== 'string')) {
		return null
	}

	return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export const sendRequestImg = (
	url: string,
	callback?: (err?: object) => void,
) => {
	// Create an img element and verify that it is supported.
	const image = document.createElement('img')

	// Set an event callback for the load and error events.
	const eventCallback = (err?: object) => {
		if (callback === undefined) {
			throw err
		} else if (err !== undefined) {
			callback(err)
		}
	}
	image.onload = eventCallback
	image.onerror = eventCallback

	// Set the url to send an HTTP GET request to.
	image.src = url
}

export const sendRequestXhr = (
	url: string,
	options: {
		method?: string,
		headers?: object,
		user?: string,
		password?: string,
		payload?: object,
	} = {},
	callback?: (xhr: XMLHttpRequest | null, err?: Error) => void,
) => {
	// Verify that the required objects are supported.
	if (XMLHttpRequest === undefined) {
		const err = new Error('The XMLHttpRequest object is not supported.')
		if (callback === undefined) {
			throw err
		}
		callback(null, err)
		return
	}
	if (JSON === undefined) {
		const err = new Error('The JSON object is not supported.')
		if (callback === undefined) {
			throw err
		}
		callback(null, err)
		return
	}

	// Extract the inputs.
	const method = options.method !== undefined
		? options.method
		: 'POST'
	const headers = options.headers !== undefined
		? options.headers
		: {}
	const payload = options.payload !== undefined
		? JSON.stringify(options.payload)
		: undefined

	// Create the xhr object.
	const xhr = new XMLHttpRequest()

	// Set the HTTP request headers and ensure the correct content type is set if a payload is to be sent.
	Object.keys(headers).forEach((headerName) => {
		xhr.setRequestHeader(headerName, headers[headerName])
	})
	if (payload !== undefined) {
		xhr.setRequestHeader('Content-type', 'application/json')
	}

	// Set an event callback for the ready state change event.
	xhr.onreadystatechange = () => {
		if (xhr.readyState !== XMLHttpRequest.DONE) {
			return
		}

		const err = xhr.status === 0
			? new Error('No response was recieved.')
			: undefined

		if (callback === undefined) {
			throw err
		} else if (err !== undefined) {
			callback(xhr, err)
		}
	}

	// Open an async HTTP connection using the specified paramaters and send the request payload.
	xhr.open(method, url, true, options.user, options.password)
	xhr.send(payload)
}
