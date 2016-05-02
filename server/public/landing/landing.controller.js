(function () {
  'use strict'
  angular
    .module('jubilant-umbrella.landing')
    .controller('LandingController', LandingController)

  function LandingController ($state) {
    // Initialization
    var vm = this

    // Variables
    var email = null
    var password = null

    // Functions
    vm.signIn = signIn
    vm.signUp = signUp

    // Implementation Details
    function signIn () {
      console.log(email, password)
      $state.go('dashboard')
    }

    function signUp () {
      console.log(email, password)
      $state.go('dashboard')
    }
  }
})()
