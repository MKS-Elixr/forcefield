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
  var schoolname = req.headers.schoolname
  var schoolid
  // var studentid
  console.log('students hiiii')
  helper.getSchools(schoolname).then(function (response) {
    response.forEach(function (currentEl) {
      schoolid = (currentEl.ID)
    })
    console.log('*****', schoolid)
    return schoolid
  }).then(function (resp) {
    helper.showAllStudents(resp).then(function (response) {
      res.json({
        success: true,
        response: response,
        message: 'students data attached'
      })
    })
  })
})

router.get('/makersquare/emergencies', function (req, res) {
  var schoolname = req.headers.schoolname
  var schoolid
  var studenteventsid = []
  var studentid = []
  var eventsid = []
  var studentinfo
  var eventsinfo
  helper.getSchools(schoolname).then(function (response) {
    response.forEach(function (currentEl) {
      schoolid = currentEl.ID
    })
    return schoolid
  }).then(function (resp) {
    helper.getSchoolStudentEvents(resp).then(function (response) {
      console.log('this is response in getSchoolStudentEvents', response)
      response.forEach(function (currentEl) {
        studenteventsid.push(currentEl.studenteventsid)
      })
      return studenteventsid
    }).then(function (resp) {
      helper.getStudentInfoBystudenteventsid(studenteventsid).then(function (response) {
        console.log('this is response in getStudentInfoBystudenteventsid response', response)
        response.forEach(function (currentEl) {
          studentid.push(currentEl.created_by)
        })
        console.log('this is studentandevent', studentid)
        return studentid
      }).then(function (resp) {
        helper.getStudentInfo(resp).then(function (response) {
          console.log('this is get studentinfo', response)
          studentinfo = response
          console.log('this is studentinfo', studentinfo)
          return studentinfo
        }).then(function () {
          helper.getStudentInfoBystudenteventsid(studenteventsid).then(function (response) {
            console.log('this is get eventinfo', response)
            response.forEach(function (currentEl) {
              eventsid.push(currentEl.eid)
            })
            return eventsid
          }).then(function (resp) {
            helper.getEventInfo(resp).then(function (response) {
              console.log('this is geteventsinfo', response)
              eventsinfo = response
              console.log('this is eventsinfo', eventsinfo)
              return eventsinfo
            }).then(function () {
              console.log('this is eventsinfo and studentinfo ', eventsinfo, studentinfo)
              helper.eventdata(eventsinfo).then(function (eventresp) {
                console.log('this is resp', eventresp)
                return eventresp
              }).then(function (eventresp) {
                helper.studentdata(studentinfo).then(function (studentresp) {
                  console.log('this is resp from studentinfo', studentresp)
                  var data = {
                    id: eventresp.ID,
                    by: studentresp.name,
                    started: eventresp.created_at,
                    location: {longitude: eventresp.longitude, latitude: eventresp.latitude},
                    status: eventresp.status
                  }

                  return data
                }).then(function (data) {
                  res.json({
                    success: true,
                    data: data,
                    message: 'student and events data attached'
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})

module.exports = router
