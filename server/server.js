// Require Dependencies Alphabetically
var app = require('express')()
var bodyParser = require('body-parser')
var cors = require('cors')
var express = require('express')
var morgan = require('morgan')
var server = require('http').Server(app)
var sockethelper = require('./routes/sockethelper.js')
var jwt = require('jsonwebtoken')
var knex = require('./db/schema.js').knex
// var dotenv = require('dotenv').config()
// var secret = process.env.TOKEN_SECRET

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
app.use('/universities', require('./routes/login-routes.js'))
app.use('/students', require('./routes/student-login-routes.js'))

// Initialize Server
server.listen(process.env.PORT || 8080)

function getSchoolPassword (name) {
  return new Promise(function (resolve, reject) {
    knex('schools')
      .select('password')
      .where('name', name)
      .then(function (resp) {
        resolve(resp)
      })
  })
}

function getSchoolName (name) {
  return new Promise(function (resolve, reject) {
    knex('schools')
      .select()
      .where('name', name)
      .then(function (resp) {
        resolve(resp)
      })
  })
}

app.post('/schools/signin', function (req, res) {
  var generateToken = jwt.sign({
    name: req.body.name,
    password: req.body.password
  }, process.env.TOKEN_SECRET)

  getSchoolName(req.body.name).then(function (nameResp) {
    console.log('nameResp ', nameResp)
    console.log(nameResp.length)
    if (nameResp.length === 0) {
      res.json({success: false}).status(500)
    } else {
      getSchoolPassword(req.body.name).then(function (resp) {
        console.log('getStudentsPassword', resp)
        if (req.body.password === resp[0]['password']) {
          console.log('resp at 0', resp[0])
          res.json({success: true, generateToken: generateToken}).status(201)
        } else {
          res.json({success: false}).status(500)
        }
      })
    }
  })
})

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

              io.sockets.emit('newEmergency', {
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
      sockethelper.updateStudentLocation(resp, data.location.longitude, data.location.latitude).then(function (response) {})
    })
  })
})

module.exports = app
