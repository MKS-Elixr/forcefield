(function () {
  'use strict'
  angular
    .module('jubilant-umbrella.landing')
    .controller('LandingController', LandingController)

  function LandingController (Authentication, $state) {
    // Initialization
    var vm = this

    // Variables
    vm.password
    vm.name

    // Functions
    vm.signIn = signIn

    // Implementation Details
    function signIn () {
      Authentication.signIn(vm.name, vm.password)
    }
  }
})()
