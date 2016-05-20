// Require Dependencies Alphabetically
var fixtures = require('../fixtures.js')
var express = require('express')
var router = express.Router()

// Require Depedencies Non Alphabetically

// Root
router.route('/')
  .get(function (request, response) {
    response.json({
      data: fixtures.schools,
      status: 'success'
    })
  })

// Sign In
router.route('/signin')
  .post(function (request, response) {
    response.json({
      data: 'not yet implemented',
      status: 'error'
    })
  })

// Sign Up
router.route('/signup')
  .post(function (request, response) {
    response.json({
      data: 'not yet implemented',
      status: 'error'
    })
  })

// Students
router.route('/:school/students')
  .get(function (request, response) {
    response.json({
      data: 'not yet implemented',
      status: 'error'
    })
  })

// Emergencies
router.route('/:school/emergencies')
  .get(function (request, response) {
    if (fixtures.emergencies[request.params.school]) {
      response.json({
        data: fixtures.emergencies[request.params.school],
        status: 'success'
      })
    } else {
      response.json({
        data: 'school not found',
        status: 'fail'
      })
    }
  })

module.exports = router
