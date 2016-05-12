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
    vm.account.email
    vm.account.name
    vm.account.password
    vm.account.phone
    vm.newUser = false

    // Functions
    vm.authenticate = authenticate

    // Implementation Details
    function authenticate () {
      $state.go('dashboard')
    }
  }
})()
