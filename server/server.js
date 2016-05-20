// Require Dependencies Alphabetically
var app = require('express')()
var express = require('express')
var morgan = require('morgan')
var server = require('http').Server(app)

// Require Dependencies Non Alphabetically
var io = require('socket.io')(server)

// Use Morgan for Logging
app.use(morgan('dev'))

// Serve Public Directory as Root
app.use(express.static('./public'))

// Setup Routes
app.use('/schools', require('./routes/schools.js'))

// Initialize Server
server.listen(process.env.PORT || 8080)

// Listen for Socket Connections
io.on('connection', function (client) {
  console.log('New Connection')

  // Listen for Button Presses
  client.on('buttonPress', function (data) {
    console.log('Button Pressed:', data)

    // Emit a New Emergency
    console.log('Emitting a New Emergency')
    io.sockets.emit('newEmergency', {
      active: true,
      by: 'Mark Castle',
      ended: null,
      id: '6KL9J',
      locations: [{
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        timestamp: Date.now()
      }],
      phone: '012.345.6789',
      started: Date.now()
    })
  })

  // Listen for Position Changes
  client.on('positionChange', function (data) {
    console.log('Position Change:', data)

    // Emit Movement
    console.log('Emitting Movement')
    io.sockets.emit('movement', {
      id: data.id,
      location: {
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        timestamp: Date.now()
      }
    })
  })

  client.on('ended', function (data) {
    console.log('Ended:', data)
    io.sockets.emit('ended', data)
  })
})
