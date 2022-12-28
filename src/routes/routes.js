const express = require('express')
let router = express.Router()
const healthRouter = require('./health')
const clientRouter = require('./client')

function getRouter() {
    healthRouter(router)
	clientRouter(router)

	return router
}

module.exports = getRouter