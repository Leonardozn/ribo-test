const app = require('./app')
const config = require('./src/config/app')
const port = 8300

app.listen(port, config.EXPRESS_HOSTNAME, () => {
    console.log(`Run in port ${port}`)
})
    