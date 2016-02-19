angular.module('mflyTemplateApp')

.controller('PieCtrl', function($scope, $location){

    // UtilData.getGoogleWorkSheetData();
    // $scope.sumTotal = UtilData.sumTotal();
    // $scope.outlet   = name;
    // $scope.weeks    = value;
	$scope.mainMenuItems = [
	        { href: '/', text: 'Main' },
	        { href: '#', text: 'textHelper' },
	        { href: function() { alert('hello!'); }, text: 'Call JS' },
	        {
	            text: 'Available Parameters', items: [
	                {
	                    text: 'mandatory',
	                    items: [
	                        { text: 'mmenu-id' },
	                        { text: 'mmenu-items' }
	                    ]
	                },
	                {
	                    text: 'optional',
	                    items: [
	                        { text: 'mmenu-options' },
	                        { text: 'mmenu-params' },
	                        { text: 'mmenu-invalidate' }
	                    ]
	                }
	            ]
	        }
	];

	$scope.show = function() {
		mflyCommands.showControlBars();
	};	

	$scope.hide = function() {
		mflyCommands.hideControlBars();
	};

});