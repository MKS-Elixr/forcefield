var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var cors = require('cors')
// var dummyData = require('./db/dummyData.js')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(cors())

app.use('/universities', require('./routes/routes.js'))

module.exports = app

// dummyData.makeStudents()
// dummyData.makeEvents()
// dummyData.makeSchools()
// dummyData.makeStudentEvents()

var port = process.env.PORT || 8080

app.listen(port, function () {
  console.log('The server is available at http://localhost:' + port)
})
