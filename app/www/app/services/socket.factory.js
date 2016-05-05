(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .factory('Socket', Socket)

  function Socket (socketFactory) {
    return socketFactory()
  }
})()
