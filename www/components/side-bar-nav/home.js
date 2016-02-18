angular.module('mflyTemplateApp')
	.controller('HomeCtrl', function($scope, $location, mflyTemplates){

		$scope.logo = mflyTemplates.getLogo();

		mflyTemplates.searchFolders('@mainNav').then(function(data) {

			$scope.folders = data;

		})


		$scope.subFolder = function(id) {
			var url = '/sub-folder?id=' + id;
			$location.url(url);
		}

		// $scope.closeApp = function() {
		// 	mflyTemplates.showControlBars();
		// }

		// var rootID = "__root__";
		
		// mflyTemplates.getFolder(rootID).then(function(data){
		// 	var dataArray = data;
		// 	var sliceData = dataArray.slice(1,5);
		// 	$scope.folders = sliceData.map(function(item){
		// 		item.class = item.name.replace(' ', '-').toLowerCase();
		// 		item.inactive = false;
		// 		return item;
		// 	});
		// })

		$scope.toggleClass = function(index) {
			$scope.folders.forEach(function(folder){
				folder.inactive = true;
			})
			$scope.folders[index].inactive = false;
		}

		// $scope.makeAllActiveClasses = function() {
		// 	$location.url('/');
		// 	$scope.folders.forEach(function(folder){
		// 		folder.inactive = false;
		// 	})
		// }

		// $scope.openMainFolder = function(index) {
		// 	$location.url("/" + $scope.folders[index].class);
		// }

		$scope.people = [
			{
				name: 'Scott', 
				age: '23', 
				birthday: 'December 17th, 1992'
			}, 			
			{
				name: 'John', 
				age: '46', 
				birthday: 'May 5th, 1980'
			}
		];
	})