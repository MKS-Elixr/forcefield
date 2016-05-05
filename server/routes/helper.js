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

function getStudentsEvents (eid) {
  return new Promise(function (resolve, reject) {
    knex('studentsevents')
      .whereIn('eid', eid)
      // .andWhereIn('created_by', sdid)
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

function showAllStudents (sid) {
  return new Promise(function (resolve, reject) {
    knex('students')
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

function getSchoolStudentEvents (schoolid) {
  return new Promise(function (resolve, reject) {
    knex('schoolstudentevents')
      // .select('ID')
      .where('sid', schoolid)
      .then(function (resp) {
        console.log('this is schoolstudentevents resp', resp)
        resolve(resp)
      })
  })
}

function getStudentInfoBystudenteventsid (studenteventsid) {
  return new Promise(function (resolve, reject) {
    knex('studentsevents')
      .whereIn('ID', studenteventsid)
      .then(function (resp) {
        console.log('this is getStudentInfoBystudenteventsid resp', resp)
        resolve(resp)
      })
  })
}

function eventdata (eventsarray) {
  console.log('hey ')
  return new Promise(function (resolve, reject) {
    eventsarray.forEach(function (currentEl) {
      resolve(currentEl)
    })
  })
}

function studentdata (studentarray) {
  console.log('bye')
  return new Promise(function (resolve, reject) {
    studentarray.forEach(function (currentEl) {
      resolve(currentEl)
    })
  })
}

module.exports = {
  getSchools: getSchools,
  getStudentsId: getStudentsId,
  getStudentsEvents: getStudentsEvents,
  getEvents: getEvents,
  getStudentInfo: getStudentInfo,
  getEventInfo: getEventInfo,
  showAllStudents: showAllStudents,
  showAllEvents: showAllEvents,
  getStudentEventsId: getStudentEventsId,
  getSchoolStudentEvents: getSchoolStudentEvents,
  getStudentInfoBystudenteventsid: getStudentInfoBystudenteventsid,
  eventdata: eventdata,
  studentdata: studentdata
}
