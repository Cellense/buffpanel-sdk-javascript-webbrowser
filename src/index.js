// Load scoped modules.
const config = require('@player1os/config').default

// Load npm modules.
const express = require('express')

// Load node modules.
const path = require('path')

// Initialize the app.
const app = express()

// Host the local file.
app.use(express.static(__dirname))

// Redirect to the hosted files.
app.use((req, res) => {
	res.status(303).set('Location', config.APP_REDIRECT_DESTINATION).send()
})

// Initialize the http server.
app.listen(config.APP_HTTP_PORT, config.APP_HTTP_IP, (err) => {
	if (err) {
		throw err
	}
})
