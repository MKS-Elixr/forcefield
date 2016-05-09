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
        name: 'Kobe Bryant',
        phone: '222-222-2222',
        location: {
          latitude: 34.018344,
          longitude: -118.491285
        },
        active: false
      },
      {
        uniqueID: '32T',
        started: '2016-05-08T02:33:10.000Z',
        name: 'Matt Damon',
        phone: '333-333-3333',
        location: {
          latitude: 34.017452,
          longitude: -118.490183
        },
        active: false
      },
      {
        uniqueID: '58Z',
        started: '2016-05-08T02:34:10.000Z',
        name: 'Jennifer Lawrence',
        phone: '444-444-4444',
        location: {
          latitude: 34.018439,
          longitude: -118.488184
        },
        active: false
      },
      {
        uniqueID: '09F',
        started: '2016-05-08T02:35:10.000Z',
        name: 'Elon Musk',
        phone: '555-555-5555',
        location: {
          latitude: 34.019441,
          longitude: -118.491182
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
