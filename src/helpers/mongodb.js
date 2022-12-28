const mongoose = require('mongoose')

function closeConnection(req, res, next) {
    mongoose.disconnect()
    next()
}

module.exports = {
    closeConnection
}