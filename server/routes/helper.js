var knex = require('../db/schema.js').knex

function showAllSchools () {
  return new Promise(function (resolve, reject) {
    knex('schools')
      .then(function (resp) {
        resolve(resp)
      })
  })
}

function showAllStudents (schoolid) {
  return new Promise(function (resolve, reject) {
    knex('students')
      .where('sid', schoolid)
      .then(function (resp) {
        resolve(resp)
      })
  })
}

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

function getStudentsId (sid) {
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

function getStudentsEvents (studentid) {
  return new Promise(function (resolve, reject) {
    knex('studentsevents')
      .select('eid')
      .whereIn('created_by', studentid)
      .then(function (resp) {
        console.log('getstudentsevents resp', resp)
        resolve(resp)
      })
  })
}

function getStudentInfo (studentid) {
  return new Promise(function (resolve, reject) {
    knex('students')
      .whereIn('ID', studentid)
      .then(function (resp) {
        // console.log('this is studentinfo', resp)
        resolve(resp)
      })
  })
}

function getEventInfo (eventid) {
  return new Promise(function (resolve, reject) {
    knex('events')
      .whereIn('ID', eventid)
      .then(function (resp) {
        // console.log('this is eventsinfo', resp)
        resolve(resp)
      })
  })
}

function showStudentNames (sid) {
  return new Promise(function (resolve, reject) {
    knex('students')
      .select('name')
      .where('sid', sid)
      .then(function (resp) {
        console.log('this is showallstudents', resp)
        resolve(resp)
      })
  })
}

function showAllEvents (sid) {
  return new Promise(function (resolve, reject) {
    knex('events')
      .where('sid', sid)
      .then(function (resp) {
        console.log('this is showAllEvents', resp)
        resolve(resp)
      })
  })
}

function getStudentEventsId (eventid, studentid) {
  console.log('hii')
  return new Promise(function (resolve, reject) {
    knex('studentsevents')
      .select('ID')
      .whereIn('eid', eventid)
      .whereIn('created_by', studentid)
      // .andwhere('created_by',studentid)
      .then(function (resp) {
        console.log('this is getstudenteventsid', resp)
        resolve(resp)
      })
  })
}

function showEventData (eventid) {
  console.log('really')
  return new Promise(function (resolve, reject) {
    knex('events')
      .whereIn('ID', eventid)
      .then(function (resp) {
        resolve(resp)
      })
  })
}

function showStudentsForEvents (eventid) {
  console.log('triggered')
  return new Promise(function (resolve, reject) {
    knex('studentsevents')
      .select('created_by')
      .whereIn('eid', eventid)
      .then(function (resp) {
        resolve(resp)
      })
  })
}

function joinStudentEvent (studentids) {
  return knex('studentsevents as se')
    .whereIn('se.created_by', studentids)
    .join('events as e', 'se.eid', '=', 'e.ID')
    .join('students as s', 'se.created_by', '=', 's.ID')
    .select('s.name as by', 'e.created_at as started', 'e.longitude as longitude', 'e.latitude as latitude', 'e.active as active', 'e.ended as ended').then(function (resp) {
      console.log('this is joinStudentEvet', resp)
      return resp
    })
}

module.exports = {
  showAllSchools: showAllSchools,
  getSchools: getSchools,
  getStudentsId: getStudentsId,
  getStudentsEvents: getStudentsEvents,
  getEvents: getEvents,
  getStudentInfo: getStudentInfo,
  getEventInfo: getEventInfo,
  showAllStudents: showAllStudents,
  showAllEvents: showAllEvents,
  getStudentEventsId: getStudentEventsId,
  showStudentNames: showStudentNames,
  showEventData: showEventData,
  showStudentsForEvents: showStudentsForEvents,
  joinStudentEvent: joinStudentEvent
}
