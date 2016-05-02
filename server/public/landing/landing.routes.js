(function () {
  'use strict'

  angular
    .module('jubilant-umbrella.landing')
    .config(config)

  function config ($stateProvider) {
    $stateProvider
      .state('landing', {
        url: '/landing',
        templateUrl: 'landing/landing.html',
        controller: 'LandingController as landing'
      })
  }
})()
