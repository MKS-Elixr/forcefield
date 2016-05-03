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
    vm.centerOn = function (emergency) {
      console.log(vm.emergencies)
      vm.map.center.latitude = emergency.coords.latitude
      vm.map.center.longitude = emergency.coords.longitude
      vm.map.zoom = 18
    }

    // Implementation Details
  }
})()
