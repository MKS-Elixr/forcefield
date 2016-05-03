var knex = require('../db/schema.js').knex

function getSchools (schoolname) {
  return new Promise(function (resolve, reject) {
    knex('schools')
      .select('ID')
      .where('name', schoolname)
      .then(function (resp) {
        resolve(resp)
      })
  })
}

function getStudents (sid) {
  return new Promise(function (resolve, reject) {
    knex('students')
      .select('ID')
      .where('sid', sid)
      .then(function (resp) {
        resolve(resp)
      })
  })
}

function getEvents (sid) {
  return new Promise(function (resolve, reject) {
    knex('events')
      .select('ID')
      .where('sid', sid)
      .then(function (resp) {
        console.log('this is getEvents resp', resp)
        resolve(resp)
      })
  })
}

function getStudentsEvents (eid, sdid) {
  return new Promise(function (resolve, reject) {
    knex('studentsevents')
      .where('eid', eid)
      .then(function (resp) {
        console.log('getstudentsevents resp', resp)
        resolve(resp)
      })
  })
}

function getStudentInfo (studentid) {
  return new Promise(function (resolve, reject) {
    knex('students')
      .where('ID', studentid)
      .then(function (resp) {
        console.log('this is studentinfo', resp)
        resolve(resp)
      })
  })
}

function getEventInfo (eventid) {
  return new Promise(function (resolve, reject) {
    knex('events')
      .where('ID', eventid)
      .then(function (resp) {
        console.log('this is eventsinfo', resp)
        resolve(resp)
      })
  })
}

module.exports = {
  getSchools: getSchools,
  getStudents: getStudents,
  getStudentsEvents: getStudentsEvents,
  getEvents: getEvents,
  getStudentInfo: getStudentInfo,
  getEventInfo: getEventInfo
}
