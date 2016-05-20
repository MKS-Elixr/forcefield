// Require Dependencies Alphabetically
var app = require('express')()
var bodyParser = require('body-parser')
var cors = require('cors')
var express = require('express')
var morgan = require('morgan')
var server = require('http').Server(app)
var sockethelper = require('./routes/sockethelper.js')

// Require Dependencies Non Alphabetically
var io = require('socket.io')(server)

// Use Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Use CORS
app.use(cors())

// Use Morgan
app.use(morgan('dev'))

// Serve Public Directory as Root
app.use('', express.static('./public'))

// Setup Routes
app.use('/schools', require('./routes/routes.js'))
app.use(require('./routes/signin.js'))
app.use(require('./routes/signup.js'))

// Initialize Server
server.listen(process.env.PORT || 8080)

// Listen for Socket Connections
io.on('connection', function (socket) {
  console.log('New Connection')

  // Listen for Button Presses
  socket.on('buttonPress', function (data) {
    console.log('Button Pressed', data)
    var eventid
    var studentinfo = {}
    var seid
    var lid
    var date = new Date().toISOString().slice(0, 19)
    data.location['timestamp'] = date
    var location = []
    location.push(data.location)
    location = JSON.stringify(location)

    sockethelper.getStudentInfo(data.email).then(function (response) {
      response.forEach(function (currentEl) {
        studentinfo['studentid'] = currentEl.ID
        studentinfo['schoolid'] = currentEl.sid
      })
      console.log('studentid', studentinfo.studentid)
      console.log('schoolid', studentinfo.schoolid)
      return studentinfo
    }).then(function () {
      console.log('chain continued')
      sockethelper.insertEvent(location, studentinfo.schoolid, date).then(function (response) {
        console.log('inside insertevent', response)
        eventid = response
        console.log('eventid', eventid)
        return response
      }).then(function () {
        console.log('chain continued 2')
        sockethelper.insertIntoStudentEvents(studentinfo.studentid, eventid).then(function (response) {
          console.log('studentevent inserted', response)
          seid = response[0]
          return seid
        }).then(function () {
          console.log('chain continued 2.5')
          console.log('this is location server.js', location)
          sockethelper.insertNewEventLocation(eventid, location).then(function (response) {
            console.log('initial location inserted', response)
            lid = response[0]
            return lid
          }).then(function () {
            console.log('chain continued 3')
            sockethelper.joinStudentEvent(studentinfo.studentid, eventid, date).then(function (response) {
              console.log('this is response', response)
              var formattedResponse = {
                active: response[0].active,
                by: response[0].by,
                ended: response[0].ended,
                id: response[0].id,
                locations: response[0].location,
                phone: response[0].phone,
                started: response[0].started
              }
              io.sockets.emit('newEmergency', formattedResponse)
            })
          })
        })
      })
    })
  })

  socket.on('newPosition', function (data) {
    console.log('Movement Detected', data)
    var date = new Date().toISOString().slice(0, 19)
    data.location['timestamp'] = date
    console.log('this is the new data.location', data.location)
    sockethelper.insertLocation(data.id, data.location).then(function (response) {
      response['id'] = data.id
      console.log('response from the other side jaysus', response)
      io.sockets.emit('movement', response)
    })
  })

  socket.on('ended', function (data) {
    var date = new Date().toISOString().slice(0, 19)
    sockethelper.onEnded(data.id, date).then(function (response) {
      console.log('hi', response)
      io.sockets.emit('ended', response)
    })
  })
})

module.exports = app
