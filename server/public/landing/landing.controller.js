(function () {
  'use strict'
  angular
    .module('jubilant-umbrella.landing')
    .controller('LandingController', LandingController)

  function LandingController (Authentication, Schools, $state) {
    // Initialization
    var vm = this
    activate()

    // Variables
    vm.account = {
      password: '',
      school: ''
    }
    vm.schools = []

    // Functions
    vm.signIn = signIn

    function activate () {
      Schools.then(function success (response) {
        vm.schools = response.data.response
      })
    }

    function signIn () {
      Authentication.signIn(vm.account.school, vm.account.password)
    }
  }
})()
