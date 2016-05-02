(function () {
  'use strict'

  angular
    .module('jubilant-umbrella.dashboard')
    .config(config)

  function config ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardController as dashboard'
      })
  }
})()
