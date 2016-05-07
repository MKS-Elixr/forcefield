(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .factory('Emergencies', Emergencies)

  function Emergencies () {
    var emergencies = [
      {
        uniqueID: '10C',
        timestamp: 'Apr 30, 2016 8:50:31 PM',
        name: 'Willie Nelson',
        phone: '222-222-2222',
        location: {
          latitude: 30.266030,
          longitude: -97.750000
        },
        active: true
      },
      {
        uniqueID: '32T',
        timestamp: 'Apr 30, 2016 10:17:40 PM',
        name: 'Sandra Bullock',
        phone: '333-333-3333',
        location: {
          latitude: 30.266900,
          longitude: -97.740550
        },
        active: true
      },
      {
        uniqueID: '58Z',
        timestamp: 'Apr 30, 2016 11:00:31 PM',
        name: 'Matthew Mcconaughey',
        phone: '444-444-4444',
        location: {
          latitude: 30.276700,
          longitude: -97.722300
        },
        active: true
      },
      {
        uniqueID: '09F',
        timestamp: 'Apr 30, 2016 10:17:40 PM',
        name: 'Michael Dell',
        phone: '555-555-5555',
        location: {
          latitude: 30.256500,
          longitude: -97.767400
        },
        active: false
      }
    ]

    return {
      all: function () {
        return emergencies
      },

      add: function (emergency) {
        emergencies.push(emergency)
      },

      close: function (emergency) {
        emergencies[emergencies.indexOf(emergency)].active = false
      },

      open: function (emergency) {
        emergencies[emergencies.indexOf(emergency)].active = true
      }
    }
  }
})()
