(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .factory('Emergencies', Emergencies)

  function Emergencies () {
    return [
      {
        'timestamp': 'Apr 30, 2016 8:50:31 PM',
        'location': 'Clarksville',
        'name': 'Willie Nelson',
        'phone': '222-222-2222',
        'coords': {
          latitude: 30.266030,
          longitude: -97.750000
        }
      },
      {
        'timestamp': 'Apr 30, 2016 10:17:40 PM',
        'location': 'South Congress',
        'name': 'Sandra Bullock',
        'phone': '333-333-3333',
        'coords': {
          latitude: 30.266900,
          longitude: -97.740550
        }
      }
    ]
  }
})()
