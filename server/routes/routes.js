// var knex = require('../db/schema.js').knex
// var app = require('../server.js')
// uncomment these lines for routes
var helper = require('./helper.js')

module.exports = function (app, express) {
  app.get('/universities', function (req, res) {
    helper.getSchools().then(function (response) {
      res.json({
        success: true,
        response: response,
        message: 'school data attached'
      })
    })
  })
}

module.exports = function (app, express) {
  app.get('/universities/makersquare/students', function (req, res) {
    helper.getStudents().then(function (response) {
      res.json({
        success: true,
        response: response,
        message: 'students data attached'
      })
    })
  })
}

module.exports = function (app, express) {
  app.get('/universities/makersquare/events', function (req, res) {
    helper.getEvents().then(function (response) {
      res.json({
        success: true,
        response: response,
        message: 'events data attached'
      })
    })
  })
}
