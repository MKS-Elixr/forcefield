(function () {
  'use strict'

  angular
    .module('jubilant-umbrella.dashboard')
    .controller('DashboardController', DashboardController)

  function DashboardController (Emergencies) {
    // Initialization
    var vm = this

    // Variables
    vm.map = {
      center: {
        latitude: 30.266926,
        longitude: -97.750519
      },
      zoom: 14
    }

    vm.emergencies = Emergencies

    // Functions

    // Implementation Details
  }
})()
