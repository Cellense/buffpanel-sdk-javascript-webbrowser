import { sender_log as senderLogStorage } from '.../src/storage'

export const getQueryParameterByName = (name) => {
	var url = window.location.href
	name = name.replace(/[\[\]]/g, '\\$&')

	var regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
	var results = regex.exec(url)
	if (!results || !results[2]) {
		return null
	}

	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const sendRequestImg = (url) => {
	const date = new Date()

	const image = document.createElement('img')
	image.onload = () => {
		senderLogStorage.push({
			success: true,
			date,
			url,
		})
	}
	image.onerror = (err) => {
		senderLogStorage.push({
			success: false,
			date,
			url,
			err,
		})
	}

	image.src = url
}
