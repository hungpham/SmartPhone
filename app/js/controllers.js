'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone','$http',
  function($scope, Phone, $http) {
    //console.log()
    $scope.phones = Phone.query();
    /*above is shortern of bellow:*/
    
    $http.get('phones/phones.json').success(function(data) {
      $scope.phones = data;
    });
    
    $scope.orderProp = 'age'; 
    //console.log($scope.phones);   

    $scope.$on('search', function(e, query) {
      // console.log(e);
      // console.log('Searching...', query);
      $scope.query = query;
    });

    $scope.$on('sort', function(e, orderProp) {
      // console.log(e);
      // console.log('Searching...', orderProp);
      $scope.orderProp = orderProp;
    });


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


phonecatControllers.controller('PhoneSearchCtrl',['$rootScope', '$scope',function($rootScope, $scope){

  $scope.search = function(){
    console.log($scope.query);
    $rootScope.$broadcast('search',$scope.query);
  }

}]);

phonecatControllers.controller('PhoneSortCtrl',['$rootScope', '$scope',function($rootScope, $scope){

  $scope.sort = function(){
    //console.log($scope.orderProp)
    $rootScope.$broadcast('sort',$scope.orderProp);
  }

  $scope.orderProp = 'age';
  $scope.orderProps = {
    'alphabet':'Alphabetical',
    'age':'Numerical'
  };
  
  // $scope.search = function(){
  //   console.log($scope.query);
  //   $rootScope.$broadcast('search',$scope.query);
  // }

}]);
