(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .run(run)

  function run (Authentication, $http, $state) {
    if (Authentication.current().token) {
    // Append Authentication Information to Each HTTP Request
    $http.defaults.headers.common['username'] = Auth.current().username
    $http.defaults.headers.common['token'] = Auth.current().token

    // Go To Dashboard Page
      $state.go('dashboard')
  } else {
    // Otherwise Go To Landing Page
    $state.go('landing')
  }
}
})()
