(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .factory('Emergencies', Emergencies)

  function Emergencies ($http) {
    return {
      all: $http.get('/schools/markersquare/emergencies'),
      add: function (emergency) {
        console.log('Not Yet Implemented')
      },
      close: function (emergency) {
        console.log('Not Yet Implemented')
      },
      open: function (emergency) {
        console.log('Not Yet Implemented')
      }
    }
  }
})()
