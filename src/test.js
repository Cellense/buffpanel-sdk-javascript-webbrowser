// Load scoped modules.
const config = require('@player1os/config')

// Load npm modules.
const express = require('express')
const lex = require('letsencrypt-express')

// Initialize the app.
const app = express()

// Create the lets encrypt wrapper for the express app.
lex.create({
    server: 'staging',
    email: config.APP_LETSENCRYPT_EMAIL,
    agreeTos: true,
    approveDomains: config.APP_LETSENCRYPT_DOMAINS,
    app: app.use('/', (req, res) => {
        res.end('Hello, World!')
    }),
}).listen(config.APP_HTTP_PORT, config.APP_HTTPS_PORT)
