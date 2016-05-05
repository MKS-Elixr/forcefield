(function () {
  'use strict'
  angular
    .module('jubilant-umbrella.landing')
    .controller('LandingController', LandingController)

  function LandingController (Authentication, $state) {
    // Initialization
    var vm = this

    // Variables
    vm.account = {}
    vm.acount.email
    vm.account.password

    // Functions
    vm.signIn = signIn
    vm.signUp = signUp

    // Implementation Details
    function signIn () {
      console.log(email, password)
      Authentication.signIn(vm.account.email, vm.account.password)
      $state.go('dashboard')
    }

    function signUp () {
      console.log(email, password)
      Authentication.signUp(vm.account.email, vm.account.password)
      $state.go('dashboard')
    }
  }
})()
