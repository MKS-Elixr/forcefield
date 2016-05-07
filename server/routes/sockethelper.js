var knex = require('../db/schema.js').knex

function getStudentInfo (email) {
  return new Promise(function (resolve, reject) {
    knex('students')
      .select('ID', 'name', 'sid')
      .where('email', email)
      .then(function (resp) {
        resolve(resp)
      })
  })
}

function insertEvent (long, lat) {
  console.log('inside event')
  return new Promise(function (resolve, reject) {
    knex('events').insert({longitude: long, latitude: lat, status: 'active', created_at: knex.fn.now()})
      // .select('ID')
      .then(function (resp) {
        resolve(resp)
      })
  })
}

function updateStudentLocation (studentid, long, lat) {
  knex('students')
    .where('ID', studentid)
    .update({longitude: long, latitude: lat}).then(function (resp) {
      console.log('inside updateStudentLocation')
    })
}

function checkAllEvents (long, lat) {
  console.log('triggered')
  return new Promise(function (resolve, reject) {
    knex('events')
      .select('ID')
      .where('longitude', long)
      .where('latitude', lat)
      .then(function (resp) {
        resolve(resp)
      })
  })
}

function insertIntoStudentEvents (studentid, eventid) {
  return new Promise(function (resolve, reject) {
    knex('studentsevents').insert({created_by: studentid, eid: eventid}).then(function (resp) {
      resolve(resp)
    })
  })
}

function showEventInfo (eventid) {
  return new Promise(function (resolve, reject) {
    knex('events')
      .where('ID', eventid)
      .then(function (resp) {
        resolve(resp)
      })
  })
}

function getEventTime (eventid) {
  return new Promise(function (resolve, reject) {
    knex('events')
      .select('created_at')
      .where('ID', eventid)
      .then(function (resp) {
        resolve(resp)
      })
  })
}

module.exports = {
  getStudentInfo: getStudentInfo,
  insertEvent: insertEvent,
  updateStudentLocation: updateStudentLocation,
  checkAllEvents: checkAllEvents,
  insertIntoStudentEvents: insertIntoStudentEvents,
  showEventInfo: showEventInfo,
  getEventTime: getEventTime
}
