(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .factory('Authentication', Authentication)

  function Authentication ($http, $localStorage, $state) {
    return {
      current: function () {
        return {
          school: $localStorage.school,
          token: $localStorage.token
        }
      },

      signIn: function (school, password) {
        $http.post('/schools/signin', {school: school.name, password: password})
          .success(function (data) {
            $localStorage.school = school
            $localStorage.token = data.token
            $http.defaults.headers.common['token'] = data.token
            $state.go('dashboard')
          })
      },

      signOut: function () {
        $localStorage.$reset()
        $state.go('landing')
      }
    }
  }
})()
