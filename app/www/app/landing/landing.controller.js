(function () {
  'use strict'

  angular
    .module('jubilant-umbrella.landing')
    .controller('LandingController', LandingController)

  function LandingController ($state) {
    // Initialization
    var vm = this

    // Variables
    vm.account = {}
    vm.account.password
    vm.account.email
    vm.account.name

    // Functions
    vm.signIn = signIn
    vm.signUp = signUp

    // Implementation Details
    function signIn () {
      $state.go('tab.dashboard')
    }

    function signUp () {
      $state.go('tab.dashboard')
    }
  }
})()
