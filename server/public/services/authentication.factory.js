(function () {
  'use strict'

  angular
    .module('jubilant-umbrella')
    .factory('Authentication', Authentication)


  function Authentication (Heroku_URL, $http, $localStorage, $state){
    return {
      current: function(){
        return{
        username: $localStorage.username,
        token: $localStorage.token
      }
    },

     signIn: function(username, password) {
       $http.post(Heroku_URL + '/landing/signin', {
         user: {
           username: username,
           password: password
         }
       }).success(function (data) {
         $localStorage.username = username
         $localStorage.token = data.token
         $http.default.headers.common['username'] = username
         $http.default.headers.common['token'] = data.token
         $state.go('/dashboard')
       })
     },

     signUp: function(username, password){
       $http.post(Heroku_URL + '/landing/signup', {
         user:{
           username: username,
           password: password
         }
       }).success(function (data) {
         $localStorage.username = username
         $localStorage.token = data.token
         $http.defaults.headers.common['username'] = username
         $http.defaults.headers.common['token'] = data.token
         $state.go('/dashboard')
       })
      }
    }


    //   console.log('services username inside signup', username);
    //   return $http({
    //     method: 'POST',
    //     url: 'index/dashboard',
    //     data: user
    //   })
    //   .then(function (resp) {
    //     $location.path('/dashboard');
    //   })
    //   .catch(function (err) {
    //     $location.path('/');
    //     console.log(err);
    //   })
    // };


    // return {
    // login: login
    // }
  }
})()
