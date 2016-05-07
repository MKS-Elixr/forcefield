(function () {
  'use strict'

  angular
    .module('jubilant-umbrella.dashboard')
    .controller('DashboardController', DashboardController)

  function DashboardController (Emergencies, $mdDialog) {
    // Initialization
    var vm = this

    // Variables
    vm.emergencies = Emergencies.all()
    vm.map = {
      center: {
        latitude: 30.266926,
        longitude: -97.750519
      },
      zoom: 14
    }

    // Functions
    vm.centerOn = centerOn
    vm.closeEmergency = closeEmergency
    vm.openEmergency = openEmergency

    // Implementation Details
    function centerOn (emergency) {
      vm.map = {
        center: {
          latitude: emergency.location.latitude,
          longitude: emergency.location.longitude
        },
        zoom: 18
      }
    }

    function closeEmergency (emergency) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to close this emergency?')
        .ok('Close Emergency')
        .cancel('Cancel')
      $mdDialog.show(confirm).then(function () {
        Emergencies.close(emergency)
      })
    }

    function openEmergency (emergency) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to open this emergency?')
        .ok('Open Emergency')
        .cancel('Cancel')
      $mdDialog.show(confirm).then(function () {
        Emergencies.open(emergency)
      })
    }
  }
})()
