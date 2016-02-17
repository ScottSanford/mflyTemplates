angular.module('mflyTemplateApp')

	.controller('SubFolderCtrl', function($scope, $routeParams, mflyTemplates){


		mflyTemplates.searchFolders('@mainNav').then(function(data) {
			console.log(data);
			$scope.navs = data;

		});

		$scope.logo = mflyTemplates.getLogo();

		var id = $routeParams.id;

		mflyTemplates.getItem(id).then(function(data){
			$scope.title = data.name;
		});

		mflyTemplates.getFolder(id).then(function(data){
			$scope.folder = data;
		});

		$scope.openFolder = function() {

		};


	})