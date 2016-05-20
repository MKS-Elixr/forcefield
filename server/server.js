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
        latitude: 34.019269,
        longitude: -118.494344,
        timestamp: Date.now()
      }],
      phone: '012.345.6789',
      started: Date.now()
    })

    setTimeout(function () {
      console.log('emitting movement')
      io.sockets.emit('movement', {
        id: '6KL9J',
        location: {
          latitude: '34.019074',
          longitude: '-118.494634'
        }
      })
    }, 1000)

    setTimeout(function () {
      console.log('emitting movement')
      io.sockets.emit('movement', {
        id: '6KL9J',
        location: {
          latitude: '34.018855',
          longitude: '-118.494375'
        }
      })
    }, 2000)

    setTimeout(function () {
      console.log('emitting movement')
      io.sockets.emit('movement', {
        id: '6KL9J',
        location: {
          latitude: '34.018627',
          longitude: '-118.494102'
        }
      })
    }, 3000)

    setTimeout(function () {
      console.log('emitting movement')
      io.sockets.emit('movement', {
        id: '6KL9J',
        location: {
          latitude: '34.018406',
          longitude: '-118.493817'
        }
      })
    }, 4000)

    setTimeout(function () {
      console.log('emitting movement')
      io.sockets.emit('movement', {
        id: '6KL9J',
        location: {
          latitude: '34.018188',
          longitude: '-118.493554'
        }
      })
    }, 5000)

    setTimeout(function () {
      console.log('emitting movement')
      io.sockets.emit('movement', {
        id: '6KL9J',
        location: {
          latitude: '34.017962',
          longitude: '-118.493282'
        }
      })
    }, 6000)

    setTimeout(function () {
      console.log('emitting movement')
      io.sockets.emit('movement', {
        id: '6KL9J',
        location: {
          latitude: '34.017602',
          longitude: '-118.493719'
        }
      })
    }, 7000)

    setTimeout(function () {
      console.log('emitting movement')
      io.sockets.emit('movement', {
        id: '6KL9J',
        location: {
          latitude: '34.017246',
          longitude: '-118.494150'
        }
      })
    }, 8000)

    setTimeout(function () {
      console.log('emitting movement')
      io.sockets.emit('movement', {
        id: '6KL9J',
        location: {
          latitude: '34.016796',
          longitude: '-118.494708'
        }
      })
    }, 9000)

    setTimeout(function () {
      console.log('emitting movement')
      io.sockets.emit('movement', {
        id: '6KL9J',
        location: {
          latitude: '34.017174',
          longitude: '-118.495137'
        }
      })
    }, 10000)
  })

  // // Listen for Position Changes
  // client.on('positionChange', function (data) {
  //   console.log('Position Change:', data)
  //
  //   // Emit Movement
  //   console.log('Emitting Movement')
  //   io.sockets.emit('movement', {
  //     id: data.id,
  //     location: {
  //       latitude: data.location.latitude,
  //       longitude: data.location.longitude,
  //       timestamp: Date.now()
  //     }
  //   })
  // })

  client.on('ended', function (data) {
    console.log('Ended:', data)
    io.sockets.emit('ended', data)
  })
})
