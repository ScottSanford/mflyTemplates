angular.module('mflyTemplateApp')

.controller('ChartsCtrl', function($scope){

  	$scope.lineChart = [
  	  { key: "One", y: 5 },
      { key: "Two", y: 2 },
      { key: "Three", y: 9 },
      { key: "Four", y: 7 },
      { key: "Five", y: 4 },
      { key: "Six", y: 3 },
      { key: "Seven", y: 9 }
    ];


});