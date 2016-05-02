(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .factory('Emergencies', Emergencies)

  function Emergencies () {
    return [
      {
        'timestamp': 'Apr 30, 2016 8:40:23 PM',
        'location': 'Hyde Park',
        'name': 'Matthew Mcconaughey',
        'phone': '111-111-1111'
      },
      {
        'timestamp': 'Apr 30, 2016 8:50:31 PM',
        'location': 'Clarksville',
        'name': 'Willie Nelson',
        'phone': '222-222-2222'
      },
      {
        'timestamp': 'Apr 30, 2016 10:17:40 PM',
        'location': 'South Congress',
        'name': 'Sandra Bullock',
        'phone': '333-333-3333',
        'latlong': [30.236429, -97.747437]
      },
      {
        'timestamp': 'Apr 30, 2016 11:12:05 PM',
        'location': 'Westlake',
        'name': 'Michael Dell',
        'phone': '444-444-4444'
      }
    ]
  }
})()
