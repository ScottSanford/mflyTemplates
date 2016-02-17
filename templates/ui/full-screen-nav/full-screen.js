angular.module('mflyTemplateApp')

.controller('UI1Ctrl', function($scope, mflyTemplates, $window){

	$scope.logo = mflyTemplates.getLogo();

	$scope.backgroundImage = mflyTemplates.getUIBackgroundImage();


	mflyTemplates.searchFolders('@Featured').then(function(data){
		$scope.featured = data;
	});	

	mflyTemplates.searchFolders('@TopLevelSales').then(function(data){
		$scope.topLevelSales = data;
	});

	$scope.myItemsImage = mflyTemplates.getMyItemsImage();


});