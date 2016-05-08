(function () {
  'use strict'

  angular
    .module('jubilant-umbrella.dashboard')
    .controller('DashboardController', DashboardController)

  function DashboardController (Emergencies, Socket, $mdDialog, $state) {
    // Initialization
    var vm = this
    activate()

    // Variables
    vm.emergencies = Emergencies.all()
    vm.map = {
      center: {
        latitude: 34.018344,
        longitude: -118.491285
      },
      zoom: 14
    }

    // Functions
    vm.centerOn = centerOn
    vm.closeEmergency = closeEmergency
    vm.fakeEmergency = fakeEmergency
    vm.logout = logout
    vm.openEmergency = openEmergency

    // Implementation Details
    function activate () {
      Socket.on('newEmergency', function (emergency) {
        // Data Server Should Provide (But Doesn't)
        emergency.active = true
        emergency.name = 'Mock Data'
        emergency.phone = '012.345.6789'

        Emergencies.add(emergency)
      })
    }

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

    function fakeEmergency () {
      Socket.emit('buttonPress', {
        email: 'fake@email.xxo',
        location: {
          latitude: '50.4932021',
          longitude: '50.431290421'
        }
      })
    }

    function logout () {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to logout?')
        .ok('Logout')
        .cancel('Cancel')
      $mdDialog.show(confirm).then(function () {
        $state.go('landing')
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
