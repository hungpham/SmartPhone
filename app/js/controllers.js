'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', ['pascalprecht.translate']);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone','$http', 
  function($scope, Phone, $http) {
    console.log(11);
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

  phonecatControllers.config(function ($translateProvider) {       
      $translateProvider.useStaticFilesLoader({
      prefix: 'js/lang-',
      suffix: '.json'
    });
      
      $translateProvider.preferredLanguage('en');
      });

  // phonecatControllers.controller('langCtrl', function ($scope, $translate) {
  //   $scope.changeLanguage = function (key) {
  //     $translate.use(key);
  //   };
  // });

  phonecatControllers.controller('langCtrl', 
    function($scope, $translate){

      $scope.languages= [
          {
            "id": "en",
            "name": "English"
          },
          {
            "id": "fr",            
            "name": "France"            
          },
        ];    

      $scope.myOption = $scope.languages[0];
      
      $scope.changeLanguage = function(key) {
        key = $scope.myOption.id;
        // console.log(key);
        $translate.use(key);
      };
        
  })
