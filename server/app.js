const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config.js')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }));

require('./routes')(app)

app.listen(config.port, () => console.log(`Server is listening on port ${config.port}.`))