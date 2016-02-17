angular.module('pieChartPOC')

.controller('SalesCtrl', function($scope, UtilData, $location, localStorageService, ngDialog){

    var name  = localStorageService.get('name');
    var value = localStorageService.get('value');

    UtilData.getGoogleWorkSheetData();
    $scope.sumTotal = UtilData.sumTotal();
    $scope.outlet   = name;
    $scope.weeks    = value;

    $scope.snapshot = function() {
    	
    	ngDialog.openConfirm({
	        template: 'dialog/snapshot.html',
	        className: 'ngdialog-theme-default'
    	});

    };

    $scope.previousItem = function() {
        mflyCommands.previous();
    }

    $scope.nextItem = function() {
        mflyCommands.next();
    }


});