// var knex = require('../db/schema.js').knex
var router = require('express').Router()
var helper = require('./helper.js')

router.get('/', function (req, res) {
  var schoolname = req.headers.schoolname
  console.log('this is schoolname is req.header', schoolname)
  helper.getSchools(schoolname).then(function (response) {
    res.json({
      success: true,
      response: response,
      message: 'school data attached'
    })
  })
})

router.get('/makersquare/students', function (req, res) {
  var sid = req.headers.clientid
  helper.getStudents(sid).then(function (response) {
    res.json({
      success: true,
      response: response,
      message: 'students data attached'
    })
  })
})

router.get('/makersquare/events', function (req, res) {
  var schoolname = req.headers.schoolname
  var studentid
  var schoolid
  var eventsid
  // var studenteventsid
  helper.getSchools(schoolname).then(function (response) {
    response.forEach(function (currentEl) {
      schoolid = currentEl.ID
    })
    return schoolid
  }).then(function (resp) {
    console.log('hi', resp)
    helper.getEvents(resp).then(function (response) {
      console.log('this is getEvents response', response)
      response.forEach(function (currentEl) {
        eventsid = currentEl.ID
      })
      return eventsid
    }).then(function (resp) {
      helper.getStudentsEvents(resp).then(function (response) {
        console.log('this is getstudentevents response', response)
        response.forEach(function (currentEl) {
          studentid = currentEl.created_by
        })
        return studentid
      }).then(function (resp) {
        helper.getStudentInfo(resp).then(function () {
          helper.getEventInfo(eventsid).then(function (response) {
            res.json({
              success: true,
              response: response,
              message: 'student info and events info attached'
            })
          })
        })
      })
    })
  })
})

module.exports = router
