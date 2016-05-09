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
app.use('/universities', require('./routes/routes.js'))

// Initialize Server
server.listen(process.env.PORT || 8080)

// Listen for Socket Connections
io.on('connection', function (socket) {
  console.log('New Connection')

  // Listen for Button Presses
  socket.on('buttonPress', function (data) {
    console.log('Button Pressed')

    var eventid
    var eventtime
    var studentid
    var studentname

    sockethelper.getStudentInfo(data.email).then(function (response) {
      response.forEach(function (currentEl) {
        studentid = currentEl.ID
      })
      return studentid
    }).then(function () {
      sockethelper.getStudentInfo(data.email).then(function (response) {
        response.forEach(function (currentEl) {
          studentname = currentEl.name
        })
        return studentname
      })
    }).then(function () {
      sockethelper.checkAllEvents(data.location.longitude, data.location.latitude).then(function (response) {
        if (response.length !== 0) {
        } else {
          sockethelper.insertEvent(data.location.longitude, data.location.latitude).then(function (response) {
            eventid = response
            return eventid
          }).then(function (resp) {
            sockethelper.getEventTime(resp).then(function (response) {
              eventtime = response
              return eventtime
            })
          }).then(function (resp) {
            sockethelper.insertIntoStudentEvents(studentid, eventid).then(function (response) {
              var data = {
                eventid: eventid[0],
                studentname: studentname,
                eventtime: eventtime[0]
              }
              return data
            }).then(function (resp) {
              console.log('Emitting a New Emergency')

              socket.broadcast.emit('newEmergency', {
                id: resp.eventid,
                by: resp.studentname,
                started: resp.eventtime.created_at,
                location: data.location,
                status: 'active'
              })
            })
          })
        }
      })
    })
  })

  // Listen for Movement
  io.on('movement', function (data) {
    console.log('Movement Detected')

    var studentid

    sockethelper.matchEmail(data.email).then(function (response) {
      response.forEach(function (currentEl) {
        studentid = currentEl.ID
      })
      return studentid
    }).then(function (resp) {
      sockethelper.updateStudentLocation(resp, data.location.longitude, data.location.latitude).then(function (response) {
      })
    })
  })
})

module.exports = app
