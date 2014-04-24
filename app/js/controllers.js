'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', ['pascalprecht.translate']);

  phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone', '$http', function($scope, Phone, $http) {
    //console.log()
    $scope.phones = Phone.query();
    /*above is shortern of bellow:*/
    
    $http.get('phones/phones.json').success(function(data) {
      $scope.phones = data;

    });
    
    $scope.orderProp = 'age'; 
    //console.log($scope.phones);   
    /*default value for compare*/

    $scope.phone1 = {
      phone_name: '',
      phone_id: ''
    };
    $scope.phone2 = {
      phone_name: '',
      phone_id: ''
    };

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

    //$scope.confirmed = false;
    $scope.phoneSelect = function(phone){   
      console.log(phone.confirmed); 

      if(phone.confirmed == true && $scope.phone1.phone_id == ''){

        $scope.phone1.phone_id = phone.id;
        $scope.phone1.phone_name = phone.name;
      }
      else if(phone.confirmed == true && $scope.phone2.phone_id == ''){

        $scope.phone2.phone_id = phone.id;
        $scope.phone2.phone_name = phone.name;
      } 
      else if(phone.confirmed == false && $scope.phone1.phone_id == phone.id ){

        $scope.phone1.phone_id = '';
        $scope.phone1.phone_name = '';
      } 
      else if(phone.confirmed == false && $scope.phone2.phone_id == phone.id){

        $scope.phone2.phone_id = ''; 
        $scope.phone2.phone_name = '';
      }  
     
    }

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
    

    /*Compare number value*/
    $scope.valuePercent = function(number1, number2) {
      number1 = parseInt(number1); 
      number2 = parseInt(number2); 
      if(angular.isNumber(number1) && angular.isNumber(number2)) {
        return (number1 / (number1 + number2)) * 100;        
      } else {
        return 0;
      }
    },

    $scope.valueColor = function(number1, number2) {
      number1 = parseInt(number1); 
      number2 = parseInt(number2); 
      if(number1 <= number2) {
        return '#9BC09A'
      } else {
        return '#5cb85c';
      }
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
    'name':'Alphabetical',
    'age':'Newest'
  };
  
  // $scope.search = function(){
  //   console.log($scope.query);
  //   $rootScope.$broadcast('search',$scope.query);
  // }

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
