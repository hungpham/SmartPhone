'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    /*above is shortern of bellow:*/
    
    $http.get('phones/phones.json').success(function(data) {
      $scope.phones = data;
    });
    

    $scope.orderProp = 'age';
    console.log($scope.phones);
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);

phonecatControllers.controller('PhoneCompareCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone1 = Phone.get({phoneId: $routeParams.phoneId1}, function(phone) {
      $scope.mainImageUrl1 = phone.images[0];
    });

    $scope.setImage1= function(imageUrl) {
      $scope.mainImageUrl1 = imageUrl;
    }
    /*phone 2*/
    $scope.phone2 = Phone.get({phoneId: $routeParams.phoneId2}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });
    $scope.setImage2= function(imageUrl) {
      $scope.mainImageUrl2 = imageUrl;
    }
    
  }]);
