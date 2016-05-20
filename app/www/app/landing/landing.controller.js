(function () {
  'use strict'

  angular
    .module('jubilant-umbrella.landing')
    .controller('LandingController', LandingController)

  function LandingController (Socket, $ionicSlideBoxDelegate, $state) {
    // Initialization
    var vm = this
    activate()

    // Variables
    vm.account = {
      email: null,
      name: null,
      password: null,
      phone: null,
      school: null
    }
    vm.connected = {
      id: null,
      name: null
    }
    vm.message = 'Initializing'
    vm.newUser = false

    // Functions
    vm.authenticate = authenticate
    vm.nextSlide = nextSlide
    vm.slideChanged = slideChanged
    vm.triggerEmergency = triggerEmergency

    // Implementation Details
    function activate () {
    }

    function authenticate () {
      $state.go('dashboard')
    }

    function configure (callback) {
      // Notify User
      vm.message = 'Configuring'
      $ionicSlideBoxDelegate.update()

      // Write Verification Key
      var verificationKey = new Uint8Array([0x80, 0xbe, 0xf5, 0xac, 0xff])
      ble.write(vm.connected.id, 'FFFFFFF0-00F7-4000-B000-000000000000', 'FFFFFFF5-00F7-4000-B000-000000000000', verificationKey.buffer, function success () {
        // Switch From Long Presses to Short Presses
        var detectionSetting = new Uint8Array([0x01])
        ble.write(vm.connected.id, 'FFFFFFF0-00F7-4000-B000-000000000000', 'FFFFFFF2-00F7-4000-B000-000000000000', detectionSetting.buffer, function success () {
          // Finish
          callback()
        }, error)
      }, error)
    }

    function connect (device, callback) {
      // Notify User
      vm.message = 'Connecting'
      $ionicSlideBoxDelegate.update()

      // Connect to Device
      ble.connect(device.id, function success (data) {
        // Save Device Information
        vm.connected = {
          id: device.id,
          name: device.name
        }

        // Finish
        callback()
      }, error)
    }

    function error (message) {
      console.log(message)
    }

    function nextSlide () {
      $ionicSlideBoxDelegate.next()
    }

    function slideChanged (index) {
      if (index === 0) {
        // Introduction
      } else if (index === 1) {
        // Pairing
        ble.isEnabled(function success () {
          scan(function success (device) {
            // Connect to Device
            connect(device, function success () {
              // Configure Device
              configure(function success () {
                console.log('inside configure')
                // Subscribe to Button Presses
                subscribe(function success () {
                  // Set Message to Connected
                  vm.message = 'Connected!'
                  $ionicSlideBoxDelegate.update()
                })
              })
            })
          })
        },
        function failure () {
          window.alert('Please enable bluetooth.')
        })
      } else if (index === 2) {
        // Account

      }
    }

    function scan (callback) {
      // Notify User
      vm.message = 'Scanning'
      $ionicSlideBoxDelegate.update()

      // Start Scanning
      ble.startScan([], function success (device) {
        // Check if Device is a V.ALRT
        if (device.name && device.name.indexOf('V.ALRT') > -1) {
          // Stop Scanning
          ble.stopScan(function success () {
            // Finish
            callback(device)
          }, error)
        }
      }, error)
    }

    function subscribe (callback) {
      // Notify User
      vm.message = 'Subscribing'
      $ionicSlideBoxDelegate.update()

      // Listen for Button Presses
      ble.startNotification(vm.connected.id, 'FFFFFFF0-00F7-4000-B000-000000000000', 'FFFFFFF4-00F7-4000-B000-000000000000', function (buffer) {
        // Triger Socket Emergency When Pressed
        if (new Uint8Array(buffer)[0] === 1) {
          triggerEmergency()
        }
      }, error)

      // Finish
      callback()
    }

    function triggerEmergency () {
      // Trigger Socket Emergency
      Socket.emit('buttonPress', {
        email: Math.floor((Math.random() * 100000) + 1).toString() + '@example.com',
        location: {
          latitude: '34.01' + Math.floor((Math.random() * 100000) + 1).toString(),
          longitude: '-118.49' + Math.floor((Math.random() * 100000) + 1).toString()
        }
      })
    }
  }
})()
