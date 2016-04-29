(function () {
  'use strict'

  angular
    .module('jubilant-umbrella.settings')
    .controller('SettingsController', SettingsController)

  function SettingsController ($state) {
    // Initialization
    var vm = this

    // Variables

    // Functions
    vm.signOut = signOut

    // Implementation Details
    function signOut () {
      $state.go('landing')
    }
  }
})()
