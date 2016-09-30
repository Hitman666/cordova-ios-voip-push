// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $http, $rootScope, $timeout) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        $rootScope.deviceToken = 'Waiting...';
        $rootScope.log = '';

        /* Helper functions */
        function log(msg) {
            $timeout(function() {
                var m = JSON.stringify(msg);
                
                console.log(m);
                $rootScope.log += '<br>' + m;
            }, 300);
        }

        /* VoIP push */
        var push = VoIPPushNotification.init();

        push.on('registration', function(data) {
            log("[Ionic] registration callback called");
            log(data);

            $timeout(function(){
                $rootScope.deviceToken = data.deviceToken;    
            }, 300);

            // do something with the device token (probably save it to your backend service)
        });

        push.on('notification', function(data) {
            log("[Ionic] notification callback called");
            log(data);

            // do something based on received data
        });

        push.on('error', function(e) {
            log(e);
        });
    });
})