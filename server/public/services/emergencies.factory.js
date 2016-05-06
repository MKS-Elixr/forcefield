(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .factory('Emergencies', Emergencies)

  function Emergencies () {
    return [
      {
        'uniqueID': '10C',
        'timestamp': 'Apr 30, 2016 8:50:31 PM',
        'location': 'Clarksville',
        'name': 'Willie Nelson',
        'phone': '222-222-2222',
        'coords': {
          latitude: 30.266030,
          longitude: -97.750000
        },
        'active': true
      },
      {
        'uniqueID': '32T',
        'timestamp': 'Apr 30, 2016 10:17:40 PM',
        'location': 'South Congress',
        'name': 'Sandra Bullock',
        'phone': '333-333-3333',
        'coords': {
          latitude: 30.266900,
          longitude: -97.740550
        },
        'active': true
      },
      {
        'uniqueID': '58Z',
        'timestamp': 'Apr 30, 2016 11:00:31 PM',
        'location': 'Hyde Park',
        'name': 'Matthew Mcconaughey',
        'phone': '444-444-4444',
        'coords': {
          latitude: 30.276700,
          longitude: -97.722300
        },
        'active': true
      },
      {
        'uniqueID': '09F',
        'timestamp': 'Apr 30, 2016 10:17:40 PM',
        'location': 'Westlake',
        'name': 'Michael Dell',
        'phone': '555-555-5555',
        'coords': {
          latitude: 30.256500,
          longitude: -97.767400
        },
        'active': true
      }
    ]
  }
})()
