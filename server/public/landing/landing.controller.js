(function () {
  'use strict'
  angular
    .module('jubilant-umbrella.landing')
    .controller('LandingController', LandingController)

  function LandingController (Schools, $state) {
    // Initialization
    var vm = this
    activate()

    // Variables
    vm.password = ''
    vm.school = ''
    vm.schools = []

    // Functions
    vm.signIn = signIn
    vm.signUp = signUp

    function activate () {
      Schools.then(function success (response) {
        vm.schools = response.data.response
      })
    }

    function signIn () {
      $state.go('dashboard')
    }

    function signUp () {
      $state.go('dashboard')
    }
  }
})()
