(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .factory('Emergencies', Emergencies)

  function Emergencies () {
    var emergencies = [
      {
        uniqueID: '10C',
        started: '2016-05-08T02:32:10.000Z',
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
        started: '2016-05-08T02:33:10.000Z',
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
        started: '2016-05-08T02:34:10.000Z',
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
        started: '2016-05-08T02:35:10.000Z',
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
