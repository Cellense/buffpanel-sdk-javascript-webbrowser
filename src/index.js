// Load scoped modules.
const config = require('@player1os/config').default

// Load npm modules.
const express = require('express')

// Load node modules.
const path = require('path')

// Initialize the app.
const app = express()

// Expose the hosted files.
app.use(express.static(path.join(config.APP_ROOT_PATH, 'build', 'browser')))

// Initialize the http server.
app.listen(config.APP_HTTP_PORT, config.APP_HTTP_IP, (err) => {
	if (err) {
		throw err
	}
})
