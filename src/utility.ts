export const generateSearchParameters = (searchParameters: {
	[name: string]: string,
}) => {
	const names = Object.keys(searchParameters)

	if (names.length === 0) {
		return ''
	}

	return '?' + names.map((name) => {
		return `${name}=${searchParameters[name]}`
	}).join('&')
}

export const getQueryParameterByName = (name) => {
	const token = name.replace(/[\[\]]/g, '\\$&')
	const regex = new RegExp(`[?&]${token}(=([^&#]*)|&|#|$)`)

	const results = regex.exec(window.location.href)
	if (!results || !results[2]) {
		return null
	}

	return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export const sendRequestImg = (
	url: string,
	callback?: (err?: object) => void,
) => {
	const image = document.createElement('img')
	if (!image) {
		if (callback) {
			callback(new Error('Img element not supported.'))
		}
		return
	}

	image.onload = () => {
		if (callback) {
			callback()
		}
	}
	image.onerror = (err) => {
		if (callback) {
			callback(err)
		}
	}

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
	if (!XMLHttpRequest) {
		if (callback) {
			callback(null, new Error('XMLHttpRequest object not supported.'))
		}
		return
	}
	if (!JSON) {
		if (callback) {
			callback(null, new Error('JSON object not supported.'))
		}
		return
	}

	const method = options.method
		? options.method
		: 'POST'
	const headers = options.headers
		? options.headers
		: {}
	const payload = options.payload
		? JSON.stringify(options.payload)
		: undefined

	const xhr = new XMLHttpRequest()

	Object.keys(headers).forEach((headerName) => {
		xhr.setRequestHeader(headerName, headers[headerName])
	})
	if (payload) {
		xhr.setRequestHeader('Content-type', 'application/json')
	}

	xhr.onreadystatechange = () => {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (callback) {
				callback(xhr, xhr.status === 0
					? new Error('Response was not recieved.')
					: undefined)
			}
		}
	}

	xhr.open(method, url, true, options.user, options.password)
	xhr.send(payload)
}
