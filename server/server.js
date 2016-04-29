var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var cors = require('cors')
var config = require('./modules/config')
var path = require('path')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use('/node_modules', express.static(path.join(__dirname, '/../node_modules')))

app.use(cors())

require('./routes/routes.js')(app, express)

module.exports = app

app.listen(config.port, function () {
  console.log('The server is available at http://localhost:', config.port)
})
