(function () {
  'use strict'

  angular
    .module('jubilant-umbrella.dashboard')
    .controller('DashboardController', DashboardController)

  function DashboardController (Emergencies, $mdDialog) {
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
    vm.closeEmergency = closeEmergency

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

    function closeEmergency (emergency) {
      console.log('close emergency pressed')
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to close this emergency?')
        .ok('Close Emergency')
        .cancel('Cancel');
        console.log(confirm)
        $mdDialog.show(confirm).then(function() {
          emergency.active = false
        })
      }
  }
})()
