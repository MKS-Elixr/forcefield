var knex = require('../db/schema.js').knex

function getStudentInfo (email) {
  return new Promise(function (resolve, reject) {
    knex('students')
      .select('ID', 'sid')
      .where('email', email)
      .then(function (resp) {
        resolve(resp)
      })
  })
}

function insertEvent (loc, sid, time) {
  console.log('inside event')
  return new Promise(function (resolve, reject) {
    knex('events').insert({uid: pseudoRandomString(), location: loc, active: true, created_at: time, sid: sid})
      .select('ID')
      .then(function (resp) {
        console.log('event inserted ', resp)
        resp[0].started = time
        resolve(resp)
      })
  })
}

function pseudoRandomString () {
  return Math.round((Math.pow(36, 6) - Math.random() * Math.pow(36, 5))).toString(36).slice(1)
}

function insertStudentLocations (studenteventid, loc) {
  return knex('locations')
    .where('ID', studenteventid)
    .insert({location: loc}).then(function (resp) {
      console.log('inside updateStudentLocation')
    })
}

function insertIntoStudentEvents (studentid, eventid) {
  return new Promise(function (resolve, reject) {
    knex('studentsevents')
      .where('created_by', studentid)
      .where('eid', eventid)
      .then(function (resp) {
        if (resp.length === 0) {
          knex('studentsevents').insert({created_by: studentid, eid: eventid}).then(function (resp) {
            console.log('this is resp from insertstudentsevents', resp)
            resolve(resp)
          })
        } else {
          console.error('this studentevent already exist')
        }
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

function joinStudentEvent (studentid, eventid, time) {
  return knex('studentsevents as se')
    .where('se.created_by', studentid)
    .where('se.eid', eventid)
    .join('events as e', 'se.eid', '=', 'e.ID')
    .join('students as s', 'se.created_by', '=', 's.ID')
    .select('e.uid as id', 's.name as by', 's.phonenum as phone', 'e.created_at as started', 'e.active as active', 'e.location as location', 'e.ended as ended').then(function (resp) {
      if (resp[0].active === 1) {
        resp[0].active = true
      } else if (resp[0].active === 0) {
        resp[0].active = false
      }
      resp[0].ended = null
      resp[0].started = time
      resp[0].id = resp[0].id.toUpperCase()
      resp[0].location = JSON.parse(resp[0].location)
      return resp
    })
}

function getUpdatedLocation (studentid) {
  return new Promise(function (resolve, reject) {
    knex('students')
      .where('ID', studentid)
      .select('location')
      .then(function (resp) {
        resolve(resp)
      })
  })
}

function insertLocation (uid, loc) {
  var eventid
  var lid

  return new Promise(function (resolve, reject) {
    knex('events')
      .select('ID')
      .where('uid', uid)
      .then(function (resp) {
        console.log('******this is resp', resp[0])
        eventid = resp[0].ID
        return eventid
      }).then(function () {
        knex('locations')
        .where('eid', eventid)
        .select('ID', 'locations')
        .then(function (resp) {
          console.log('this is resp 123', resp)
          var location = resp[0].locations
          lid = resp[0].ID
          location = JSON.parse(location)
          console.log('this is parsed location', location)
          // loc['timestamp'] = knex.fn.now()
          location.push(loc)

          location = JSON.stringify(location)
          console.log('this is location after push', location)
          return location
        }).then(function (resp) {
          knex('locations')
          .where('ID', lid)
          .update({locations: resp}).then(function (resp) {
            console.log('new location   inserted', resp)
          }).then(function (resp) {
            knex('locations')
            .where('ID', lid)
            .select('locations', 'eid')
            .then(function (resp) {
              resp[0].id = uid.toUpperCase()
              resolve(resp)
            })
          })
        })
      })
  })
}

function insertNewEventLocation (eventid, loc) {
  console.log('trigered')
  return new Promise(function (resolve, reject) {
    knex('locations').insert({eid: eventid, locations: loc}).then(function (resp) {
      resolve(resp)
    })
  })
}

function onEnded (id, time) {
  return new Promise(function (resolve, reject) {
    knex('events')
      .where('uid', id)
      .update({active: false, ended: time})
      .then(function (resp) {
        knex('events')
          .where('uid', id)
          .select('uid', 'active', 'ended')
          .then(function (resp) {
            console.log('case closed', resp)
            resp[0].active = false
            resp[0].ended = time
            resolve(resp)
          })
      })
  })
}

module.exports = {
  getStudentInfo: getStudentInfo,
  insertEvent: insertEvent,
  insertStudentLocations: insertStudentLocations,
  insertIntoStudentEvents: insertIntoStudentEvents,
  showEventInfo: showEventInfo,
  getEventTime: getEventTime,
  joinStudentEvent: joinStudentEvent,
  getUpdatedLocation: getUpdatedLocation,
  insertLocation: insertLocation,
  insertNewEventLocation: insertNewEventLocation,
  onEnded: onEnded
}
