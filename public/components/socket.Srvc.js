(function() {
  'use strict';

  angular
    .module('app')
    .factory('socket', socket);

  socket.$inject = ['$rootScope'];

  function socket($rootScope) {
     var socket = io.connect();
    // // //var socket = io.connect( 'ws://localhost:8080', { secure: true, transports: [ "flashsocket","xhr-polling","websocket" ] } );
    // // var socket = io.connect(window.location.protocol + "//" + window.location.hostname.split(":")[0] + ":8080", 
    // // { path: "/socket.io", transports: ['polling'], 
		// // allowUpgrades: true
    // // 	});
  //  var socket = io.connect('wss://localhost:8080',{transports: ["polling","websocket"] });
// window.onbeforeunload = function() { 
//     console.log( "unloading resources" );   
//     $scope.socket.disconnect();
//     $scope.socket.close();
//};
    return {
        on: on,
        emit: emit
    };

    function on(eventName, callback) {
      socket.on(eventName, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(socket, args);
        });
      });
    }

    function emit(eventName, data, callback) {
      socket.emit(eventName, data, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }

  }
})();
