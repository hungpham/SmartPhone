'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',

  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) { 
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      when('/phone1/:phoneId1/phone2/:phoneId2', {
        templateUrl: 'partials/compare.html',
        controller: 'PhoneCompareCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);

phonecatApp.constant('COLOR_FALSE', '#9BC09A');
phonecatApp.constant('COLOR_TRUE', '#5cb85c');