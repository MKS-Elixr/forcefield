(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .factory('Emergencies', Emergencies)

  function Emergencies () {
    var emergencies = [
      {
        id: 'HT86',
        by: 'Jennifer Lawrence',
        phone: '111-111-1111',
        started: '2016-05-08T02:34:10.000Z',
        ended: null,
        locations: [
          {
            timestamp: '2016-05-08T02:35:10.000Z',
            latitude: 34.019800,
            longitude: -118.491000
          },
          {
            timestamp: '2016-05-08T02:36:10.000Z',
            latitude: 34.019420,
            longitude: -118.491130
          },
          {
            timestamp: '2016-05-08T02:37:10.000Z',
            latitude: 34.019440,
            longitude: -118.49000
          }
        ],
        active: true
      },
      {
        id: 'BX93',
        by: 'Joaquin Phoenix',
        phone: '222-222-2222',
        started: '2016-05-08T02:24:10.000Z',
        ended: null,
        locations: [
          {
            timestamp: '2016-05-08T02:25:10.000Z',
            latitude: 34.019341,
            longitude: -118.491382
          },
          {
            timestamp: '2016-05-08T02:27:10.000Z',
            latitude: 34.019141,
            longitude: -118.491182
          },
          {
            timestamp: '2016-05-08T02:37:10.000Z',
            latitude: 34.019500,
            longitude: -118.49500
          }
        ],
        active: false
      },
      {
        id: 'UJ39',
        by: 'Elon Musk',
        phone: '333-333-3333',
        started: '2016-05-09T02:28:10.000Z',
        ended: null,
        locations: [
          {
            timestamp: '2016-05-09T02:29:10.000Z',
            latitude: 34.017341,
            longitude: -118.491382
          },
          {
            timestamp: '2016-05-09T02:30:10.000Z',
            latitude: 34.017541,
            longitude: -118.491882
          },
          {
            timestamp: '2016-05-09T02:31:10.000Z',
            latitude: 34.017041,
            longitude: -118.489382
          }
        ],
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
