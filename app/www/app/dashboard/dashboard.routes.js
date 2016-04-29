(function () {
  'use strict'

  angular
    .module('jubilant-umbrella.dashboard')
    .config(config)

  function config ($stateProvider) {
    $stateProvider
      .state('tab.dashboard', {
        url: '/dashboard',
        views: {
          'tab-dashboard': {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardController as dashboard'
          }
        }
      })
  }
})()
