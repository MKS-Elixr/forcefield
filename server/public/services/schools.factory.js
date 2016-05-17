(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .factory('Schools', Schools)

  function Schools ($http) {
    return $http.get('/schools')
  }
})()
