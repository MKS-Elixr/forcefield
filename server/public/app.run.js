(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .run(run)

  function run (Authentication, $http, $state) {
    // Set Headers & Load Dashboard If Logged In
    if (Authentication.current().token) {
      // Append Authentication Information to Each HTTP Request
      $http.defaults.headers.common['token'] = Authentication.current().token

      // Go To Dashoard
      $state.go('dashboard')
    } else {
      // Otherwise Go To Landing Page
      $state.go('landing')
    }
  }
})()
