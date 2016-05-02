(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .run(run)

  function run ($state) {
    // Load Dashboard Page
    $state.go('dashboard')
  }
})()
