(function () {
  'use strict'

  angular
    .module('jubilant-umbrella.settings')
    .controller('SettingsController', SettingsController)

  function SettingsController (Socket, $ionicPlatform, $scope, $state) {
    // Initialization
    var vm = this
    $ionicPlatform.ready(activate)

    // Variables
    vm.connected = {
      battery: null,
      id: null,
      name: null
    }
    vm.devices = []

    // Functions
    vm.activate = activate
    vm.connect = connect
    vm.error = error
    vm.scan = scan
    vm.subscribe = subscribe
    vm.success = success
    vm.signOut = signOut

    // Implementation Details
    function activate () {
      // Check If Bluetooth Is Enabled
      ble.isEnabled(function success () {
        window.alert('Bluetooth is turned on.')
      },
      function failure () {
        window.alert('Bluetooth is turned off.')
      })
    }

    function connect (device) {
      // Connect to Device
      ble.connect(device.id, function success (data) {
        // Save Device Information
        vm.connected = {
          id: device.id,
          name: device.name
        }

        // Notify User
        window.alert('Connected to ' + vm.connected.name + '!')

        // Write Verification Key
        var verificationKey = new Uint8Array([0x80, 0xbe, 0xf5, 0xac, 0xff])
        ble.write(vm.connected.id, 'FFFFFFF0-00F7-4000-B000-000000000000', 'FFFFFFF5-00F7-4000-B000-000000000000', verificationKey.buffer, function success () {
          // Switch From Long Presses to Short Presses
          var detectionSetting = new Uint8Array([0x01])
          ble.write(vm.connected.id, 'FFFFFFF0-00F7-4000-B000-000000000000', 'FFFFFFF2-00F7-4000-B000-000000000000', detectionSetting.buffer, function success () {
            // Subscribe to Button Presses
            vm.subscribe()
          }, vm.error)
        }, vm.error)
      }, vm.error)
    }

    function error (error) {
      console.log('Error:', error)
    }

    function scan () {
      // Clear Previously Found Devices
      vm.devices = []

      // Scan for Five Seconds
      ble.scan([], 5, function (device) { vm.devices.push(device); $scope.$apply() }, vm.error)
    }

    function signOut () {
      // Go to Landing Page
      $state.go('landing')
    }

    function subscribe () {
      // Listen for Button Presses
      ble.startNotification(vm.connected.id, 'FFFFFFF0-00F7-4000-B000-000000000000', 'FFFFFFF4-00F7-4000-B000-000000000000', function (buffer) {
        // Trigger Socket Emergency
        Socket.emit('buttonPress', {
          email: Math.floor((Math.random() * 100000) + 1).toString() + '@example.com',
          location: {
            latitude: '34.01' + Math.floor((Math.random() * 100000) + 1).toString(),
            longitude: '-118.49' + Math.floor((Math.random() * 100000) + 1).toString()
          }
        })
      }, vm.error)
    }

    function success (data) {
      console.log('Success:', data)
    }
  }
})()
