(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .factory('Authentication', Authentication)

  function Authentication ($http, $state) {
    return {

      signUp: function (email, password) {
        $http.post('/signup', {
          email: email,
          password: password
        })
        .then(function (data) {
          console.log('data in success', data.data.success)
          if (data.data.success === true) {
            window.alert('Successfully Signed Up!')
            $http.defaults.headers.common['email'] = email
            $http.defaults.headers.common['token'] = data.data.generateToken
            $state.go('dashboard')
          } else {
            window.alert('Email Already Exists!')
          }
        })
      },

      signIn: function (name, password) {
        $http.post('/universities/signin', {
          name: name,
          password: password

        })
        .then(function (data) {
          console.log('data success', data.data.success)
          if (data.data.success === true) {
            $http.defaults.headers.common['name'] = name
            $http.defaults.headers.common['token'] = data.data.generateToken
            $state.go('dashboard')
          } else {
            window.alert('Wrong Email or Password! Try Again')
          }
        })
      },

      random: function (data) {
        $http.post('/random', {
          data: data
        })
      },

      signOut: function () {
        $state.go('landing')
      }
    }
  }
})()
