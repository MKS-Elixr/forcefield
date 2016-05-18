(function () {
  'use strict'

  angular
    .module('jubilant-umbrella.dashboard')
    .controller('DashboardController', DashboardController)

  function DashboardController (Authentication, Emergencies, Socket, $mdDialog, $state) {
    // Initialization
    var vm = this
    activate()

    // Variables
    vm.emergencies = []
    vm.map = {
      center: {
        latitude: 34.018344,
        longitude: -118.491285
      },
      zoom: 14,
      showHeat: false
    }
    vm.school = Authentication.current().school
    // Workaround for #93
    if (typeof vm.school.location === 'string') {
      vm.school.location = eval('(' + vm.school.location + ')') // eslint-disable-line no-eval
    }
    vm.showActive = true

    // Functions
    vm.centerOn = centerOn
    vm.closeEmergency = closeEmergency
    vm.fakeEmergency = fakeEmergency
    vm.heatLayer = heatLayer
    vm.insertHeatLayer = insertHeatLayer
    vm.logout = logout
    vm.openEmergency = openEmergency
    vm.signOut = signOut

    // Implementation Details
    function activate () {
      Emergencies.all.then(function success (response) {
        vm.emergencies = response.data.response
      })
      Socket.on('newEmergency', function (emergency) {
        vm.emergencies.push(emergency)
      })
    }

    function centerOn (emergency) {
      vm.map.center.latitude = emergency.locations[emergency.locations.length - 1].latitude
      vm.map.center.longitude = emergency.locations[emergency.locations.length - 1].longitude
      vm.map.zoom = 18
    }

    function closeEmergency (emergency) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to set this emergency to inactive?')
        .ok('Set Inactive')
        .cancel('Cancel')
      $mdDialog.show(confirm).then(function () {
        Socket.emit('ended', {id: emergency.id})
        vm.emergencies[vm.emergencies.indexOf(emergency)].active = false
      })
    }

    function fakeEmergency () {
      var randomNum1 = (Math.floor((Math.random() * 100000) + 1)).toString()
      var randomNum2 = (Math.floor((Math.random() * 100000) + 1)).toString()
      Socket.emit('buttonPress', {
        email: 'testdain@email.com',
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

    function heatLayer (heatLayer) {
      var heatMapData = []
      for (var i = 0; i < vm.emergencies.length; i++) {
        var latitude = vm.emergencies[i].locations[0].latitude
        var longitude = vm.emergencies[i].locations[0].longitude
        heatMapData.push(new google.maps.LatLng(latitude, longitude))
      }

      var pointArray = new google.maps.MVCArray(heatMapData)
      heatLayer.setData(pointArray)
    }

    function insertHeatLayer (layer) {
      heatLayer(layer)
    }

    function openEmergency (emergency) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to set this emergency to active?')
        .ok('Set Active')
        .cancel('Cancel')
      $mdDialog.show(confirm).then(function () {
        Socket.emit('opened', {id: emergency.id})
        vm.emergencies[vm.emergencies.indexOf(emergency)].active = true
      })
    }

    function signOut () {
      Authentication.signOut()
    }
  }
})()
