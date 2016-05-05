// var knex = require('../db/schema.js').knex

// function makeStudents () {
//   return knex('students').insert(students).then(function (resp) {
//     console.log('students were inserted')
//   }, function (err) {
//     console.error('student insertion error. students were not created. err = ', err)
//   })
// }

// function makeSchools () {
//   return knex('schools').insert(schools).then(function (resp) {
//     console.log('schools were inserted')
//   }, function (err) {
//     console.error('schools insertion error. schools were not created. err = ', err)
//   })
// }

// function makeEvents () {
//   return knex('events').insert(events).then(function (resp) {
//     console.log('events were inserted')
//   }, function (err) {
//     console.error('events insertion error. events were not created. err = ', err)
//   })
// }

// function getStudentsId () {
//   return knex('students')
//     .then(function (resp) {
//       console.log('this is sdid resp', resp)
//       return resp
//     })
// }

// function getEventsId () {
//   return knex('events')
//     .then(function (resp) {
//       console.log('this is eid', resp)
//       return resp
//     })
// }

// function makeStudentEvents () {
//   return knex('studentsevents').insert(studentevents).then(function (resp) {
//     console.log('studentevents were inserted')
//   }, function (err) {
//     console.error('studentsevents insertion error. studentsevents were not created. err = ', err)
//   })
// }

// function makeSchoolStudentEvents () {
//   return knex('schoolstudentevents').insert(schoolstudentevents).then(function (resp) {
//     console.log('schoolstudentevents were inserted')
//   }, function (err) {
//     console.error('schoolstudentevents insertion error, schoolstudentevents were not created. err = ', err)
//   })
// }

// // function makeStudentEvents () {
// //   var studentid=[]
// //   var eventid=[]
// //   getStudentsId().then(function(resp){
// //     resp.forEach(function(currentEl){
// //       studentid.push(currentEl.ID)
// //       console.log('this is sdid in make', studentid)
// //       })
// //     return studentid[0]
// //     }).then(function(resp){
// //       console.log('this suppose to be sdid ', resp)
// //       knex('studentsevents').insert({sdid: resp}).then(function(err){
// //         console.log('err in getting sdid not inserted', err)
// //       })
// //     })
// //   getEventsId().then(function(resp){
// //     resp.forEach(function(currentEl){
// //       eventid.push(currentEl.ID)
// //       console.log('this is eid in make', eventid)
// //       })
// //     return eventid[0]
// //   }).then(function(resp){
// //     console.log('this suppose to be eid', resp)
// //     knex('studentsevents').insert({eid: resp}).then(function(err){
// //       console.log('err in getting eid not inserted', err)
// //     })
// //   })
// // }

// var studentevents = [
//   {
//     created_by: 1,
//     eid: 2
//   }
// ]
// var students = [
//   {
//     name: 'kan',
//     email: 'kan@email.com',
//     studentid: 'Kan123',
//     password: 'dog',
//     phonenum: 123345123,
//     url: 'www.google.com',
//     longitude: 123,
//     latitude: 234,
//     sid: 1
//   }, {
//     name: 'ben',
//     email: 'ben@email.com',
//     studentid: 'ben123',
//     password: 'dog',
//     phonenum: 123345123,
//     url: 'www.google.com',
//     longitude: 123,
//     latitude: 234,
//     sid: 1
//   }, {
//     name: 'jess',
//     email: 'jess@email.com',
//     studentid: 'jess123',
//     password: 'dog',
//     phonenum: 123345123,
//     url: 'www.google.com',
//     longitude: 123,
//     latitude: 234,
//     sid: 2
//   }
// ]

// var schools = [
//   {
//     name: 'markersquare',

//     longitude: 123,
//     latitude: 1234
//   },
//   {
//     name: 'kanacademy',

//     longitude: 234,
//     latitude: 2345
//   }
// ]

// var events = [
//   {
//     description: 'help',
//     status: 'active',
//     imgurl: 'http://google.com',
//     longitude: 156,
//     latitude: 246

//   },
//   {
//     description: 'help2',
//     status: 'active',
//     imgurl: 'http://google.com',
//     longitude: 5544,
//     latitude: 4566

//   },
//   {
//     description: 'help3',
//     status: 'active',
//     imgurl: 'http://google.com',
//     longitude: 156,
//     latitude: 246

//   }
//   // {
//   //   description: 'help4',
//   //   status: 'active',
//   //   imgurl: 'http://google.com',
//   //   longitude: 73728,
//   //   latitude: 3849,

//   // },
//   // {
//   //   description: 'help5',
//   //   status: 'active',
//   //   imgurl: 'http://google.com',
//   //   longitude: 73728,
//   //   latitude: 3849,

//   // },
//   // {
//   //   description: 'help6',
//   //   status: 'active',
//   //   imgurl: 'http://google.com',
//   //   longitude: 980,
//   //   latitude: 234234,

// // }
// ]

// var schoolstudentevents = [
//   {
//     studenteventsid: 1,
//     sid: 1

//   },
//   {
//     studenteventsid: 2,
//     sid: 1
//   }
// ]

// module.exports = {
//   makeStudents: makeStudents,
//   makeEvents: makeEvents,
//   makeSchools: makeSchools,
//   makeStudentEvents: makeStudentEvents,
//   makeSchoolStudentEvents: makeSchoolStudentEvents
// }
// // makeStudentEvents()
