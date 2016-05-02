var knex = require('../db/schema.js').knex

function getSchools () {
  return new Promise(function (resolve, reject) {
    knex('schools').then(function (resp) {
      resolve(resp)
    })
  })
}

function getStudents () {
  return new Promise(function (resolve, reject) {
    knex('students').then(function (resp) {
      resolve(resp)
    })
  })
}

function getEvents () {
  return new Promise(function (resolve, reject) {
    knex('events').then(function (resp) {
      resolve(resp)
    })
  })
}

module.exports = {
  getSchools: getSchools,
  getStudents: getStudents,
  getEvents: getEvents
}
