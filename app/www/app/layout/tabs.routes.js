(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .config(config)

  function config ($stateProvider) {
    $stateProvider
      .state('tab', {
        abstract: true,
        url: '/tab',
        templateUrl: 'app/layout/tabs.html'
      })
  }
})()
