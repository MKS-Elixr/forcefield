(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .factory('Emergencies', Emergencies)

  function Emergencies (Authentication, $http) {
    return {
      all: $http.get('/schools/' + Authentication.current().school.name + '/emergencies')
    }
  }
})()
