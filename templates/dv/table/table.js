angular.module('pieChartPOC')

.controller('TableCtrl', function($scope, UtilData, ngDialog, localStorageService){

    var name      = localStorageService.get('name');
    var value     = localStorageService.get('value');
    var savedData = localStorageService.get('savedData');

    $scope.sortType    = 'Supplier';
    $scope.sortReverse = false;
    $scope.searchData  = '';        
    $scope.tableData = savedData;

    $scope.outlet = name;
    $scope.weeks = value;

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