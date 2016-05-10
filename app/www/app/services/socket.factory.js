(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .factory('Socket', Socket)

  function Socket (socketFactory) {
    return socketFactory({
      ioSocket: io.connect('http://jubilant-umbrella.herokuapp.com')
    })
  }
})()
