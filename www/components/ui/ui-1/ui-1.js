angular.module('mflyTemplateApp')

.controller('UI1Ctrl', function($scope, mflyTemplates){

	$scope.backgroundImage = mflyTemplates.getUIBackgroundImage();

	$scope.logo = mflyTemplates.getLogo();

});