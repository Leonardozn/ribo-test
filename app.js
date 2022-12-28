const loadders = require('./src/loadders')
const getRouter = require('./src/routes/routes')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoHelper = require('./src/helpers/mongodb')

app.use(cors())

app.use(morgan('dev'))

app.use(express.json({ limit: '10mb' }))

app.use('/', getRouter(), mongoHelper.closeConnection)

//Handler error
app.use((err, req, res, next) => {
    res.status(err.status).json(err.body)
})

module.exports = app
    