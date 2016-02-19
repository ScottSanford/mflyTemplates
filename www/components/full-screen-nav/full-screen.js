angular.module('mflyTemplateApp')

.controller('FullScreenUICtrl', function($scope, mflyTemplates, $window){

	$scope.logo = mflyTemplates.getLogo();

	$scope.mflyBackImg = mflyTemplates.getUIBackgroundImage();


	mflyTemplates.searchFolders('@Featured').then(function(data){
		$scope.featuredData = data;
	});	

	mflyTemplates.searchFolders('@TopLevelSales').then(function(data){
		$scope.toplevelData = data;
	});

	$scope.myItemsImage = mflyTemplates.getMyItemsImage();


});