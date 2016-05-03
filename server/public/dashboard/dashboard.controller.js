(function () {
  'use strict'

  angular
    .module('jubilant-umbrella.dashboard')
    .controller('DashboardController', DashboardController)

  function DashboardController (Emergencies) {
    // Initialization
    var vm = this

    // Variables
    vm.emergencies = Emergencies
    vm.map = {
      center: {
        latitude: 30.266926,
        longitude: -97.750519
      },
      zoom: 14
    }

    // Functions
    vm.centerOn = centerOn

    // Implementation Details
    function centerOn (emergency) {
      vm.map = {
        center: {
          latitude: emergency.coords.latitude,
          longitude: emergency.coords.longitude
        },
        zoom: 18
      }
    }
  }
})()
