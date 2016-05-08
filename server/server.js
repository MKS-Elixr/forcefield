var express = require('express')
var bodyParser = require('body-parser')
var app = require('express')()
var cors = require('cors')
var server = require('http').Server(app)
var io = require('socket.io')(server)
// var knex = require('./db/schema.js').knex
var sockethelper = require('./routes/sockethelper.js')

// var dummyData= require('./db/dummyData.js')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use('', express.static('./public'))

app.use(cors())

app.use('/universities', require('./routes/routes.js'))

module.exports = app

// dummyData.makeStudents()
// dummyData.makeEvents()
// dummyData.makeSchools()
// dummyData.makeStudentEvents()
// dummyData.makeSchoolStudentEvents()

var port = process.env.PORT || 8080

// app.listen(port, function () {
//   console.log('The server is available at http://localhost:' + port)
// })

server.listen(port)

io.on('connection', function (socket) {
  console.log('New Connection')
  socket.on('buttonPress', function (data) {
    console.log('Button Press:', data)

    // insert that into yo databases (format provided)
    var studentid
    var studentname
    var eventid
    var eventtime
    sockethelper.getStudentInfo(data.email).then(function (response) {
      console.log('this is response from studentinfo', response)
      response.forEach(function (currentEl) {
        studentid = currentEl.ID
      })
      return studentid
    }).then(function () {
      console.log('chain continued 2nd')
      sockethelper.getStudentInfo(data.email).then(function (response) {
        response.forEach(function (currentEl) {
          studentname = currentEl.name
        })
        console.log(studentname)
        return studentname
      })
    })
      .then(function () {
        console.log('inside .then before check all events')
        sockethelper.checkAllEvents(data.location.longitude, data.location.latitude).then(function (response) {
          console.log('this is response', response)
          if (response.length !== 0) {
            console.log('event already exist insertion failed')
          } else {
            sockethelper.insertEvent(data.location.longitude, data.location.latitude).then(function (response) {
              console.log('inside insertEvent, new event inserted', response)
              eventid = response
              return eventid
            }).then(function (resp) {
              sockethelper.getEventTime(resp).then(function (response) {
                eventtime = response
                console.log('this is eventtime', eventtime)
                return eventtime
              })
            }).then(function (resp) {
              console.log('chain continued', eventid)
              sockethelper.insertIntoStudentEvents(studentid, eventid).then(function (response) {
                var data = {
                  eventid: eventid[0],
                  studentname: studentname,
                  eventtime: eventtime[0]
                }
                console.log('last chain', data)
                return data
              }).then(function (resp) {
                socket.emit('newEmergency', {
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

  io.on('movement', function (data) {
    var studentid

    sockethelper.matchEmail(data.email).then(function (response) {
      console.log('this is data.email', data.email)
      response.forEach(function (currentEl) {
        studentid = currentEl.ID
      })
      console.log('this is studentid', studentid)
      return studentid
    }).then(function (resp) {
      sockethelper.updateStudentLocation(resp, data.location.longitude, data.location.latitude).then(function (response) {
        console.log('student location updated')
      })
    })
  })
})
