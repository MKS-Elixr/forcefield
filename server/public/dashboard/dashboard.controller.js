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
        emergency.uniqueID = 'TEST1'
        emergency.active = true
        emergency.name = 'Mock Data'
        emergency.phone = '012-345-6789'
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
        .title('Are you sure you want to set this emergency to inactive?')
        .ok('Close Emergency')
        .cancel('Cancel')
      $mdDialog.show(confirm).then(function () {
        Emergencies.close(emergency)
      })
    }

    function fakeEmergency () {
      var randomNum1 = (Math.floor((Math.random() * 100000) + 1)).toString()
      var randomNum2 = (Math.floor((Math.random() * 100000) + 1)).toString()
      Socket.emit('buttonPress', {
        email: 'test' + randomNum1 + '@email.com',
        location: {
          latitude: '34.01' + randomNum1,
          longitude: '-118.49' + randomNum2
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
        .title('Are you sure you want to set this emergency to active?')
        .ok('Open Emergency')
        .cancel('Cancel')
      $mdDialog.show(confirm).then(function () {
        Emergencies.open(emergency)
      })
    }
  }
})()
