(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .run(run)

  function run ($ionicPlatform, $state) {
    // Configure Ionic Platform
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
        cordova.plugins.Keyboard.disableScroll(true)
      }

      if (window.StatusBar) {
        StatusBar.styleDefault()
      }
    })

    // Load Landing Page
    $state.go('landing')
  }
})()
