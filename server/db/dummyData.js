var knex = require('../db/config.js').knex

function makeUsers () {
  return knex('users').insert(users).then(function (resp) {
    console.log('users were created')
  }, function (err) {
    console.error('user insertion error. Users were not created. err = ', err)
  })
}

function makeSchools () {
  return knex('schools').insert(schools).then(function (resp) {
    console.log('schools were created')
  }, function (err) {
    console.error('school insertion error. Schools were not created. err = ', err)
  })
}
function makeUserEvents () {
  return knex('userevents').then(function (userevents) {
    userevents.forEach(function (userevents, usereventsIndex) {
      if (usereventsIndex >= userevents.length - 6) {
        return
      }

      for (var i = 1; i < 6; i++) {
        knex('userevents').insert({
          uid: users.ID,
          eid: events.ID,
          status: 'open'
        }).then(function (resp) {
          console.log(resp)
        })
      }
    })
  })
}

var users = [
  {
    username: 'kan',
    firstname: 'Kan',
    lastname: 'Adachi',
    email: 'kan@email.com',
    password: 'dog'
  }, {
    username: 'ben',
    firstname: 'Ben',
    lastname: 'Richter',
    email: 'ben@email.com',
    password: 'dog'
  }, {
    username: 'jessica',
    firstname: 'Jessica',
    lastname: 'Chou',
    email: 'jessica@email.com',
    password: 'dog'
  }
]

var schools = [
  {
    name: 'markersquare',
    password: 'marker',
    email: 'marker@marker.com',
    longtitude: 123,
    latitude: 1234
  },
  {
    name: 'kanacademy',
    password: 'kan',
    email: 'kan@kan.com',
    longtitude: 234,
    latitude: 2345
  }
]

var events = [
  {
    description: 'help',
    status: 'open',
    imgurl: 'http://google.com',
    longitude: 156,
    latitude: 246
  },
  {
    description: 'help2',
    status: 'open',
    imgurl: 'http://google.com',
    longitude: 5544,
    latitude: 4566
  },
  {
    description: 'help3',
    status: 'open',
    imgurl: 'http://google.com',
    longitude: 156,
    latitude: 246
  },
  {
    description: 'help4',
    status: 'open',
    imgurl: 'http://google.com',
    longitude: 73728,
    latitude: 3849
  },
  {
    description: 'help5',
    status: 'open',
    imgurl: 'http://google.com',
    longitude: 73728,
    latitude: 3849
  },
  {
    description: 'help6',
    status: 'open',
    imgurl: 'http://google.com',
    longitude: 980,
    latitude: 234234
  }
]

makeUsers()
makeSchools()
makeUserEvents()
