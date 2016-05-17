(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .factory('Emergencies', Emergencies)

  function Emergencies ($http) {
    return {
      all: $http.get('/schools/markersquare/emergencies')
    }
  }
})()
