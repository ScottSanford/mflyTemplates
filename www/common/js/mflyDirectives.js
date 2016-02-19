angular.module('myDirectives', [])

.directive('mflyLogo', function(){
	return {
		restrict: 'E', 
		templateUrl: 'common/tmpls/mfly-logo.html', 
		replace: true,
		link: function(scope, element, attrs) {
			var width = attrs.imgWidth;
			element.css({
				'width': width + 'px', 
				'height': 'auto'
			});
		}
	}
})

.directive('mflyTabs', function(){
	return {
		restrict: 'E', 
		replace: true,
		templateUrl: 'common/tmpls/mfly-tabs.html', 
		link: function(scope, element, attrs) {
			scope.prevItem = function() {
				mflyCommands.previous();
			}			
			scope.nextItem = function() {
				mflyCommands.next();
			}
		}
	}
})

.directive('mflyControlBars', function(){
	return {
		restrict: 'E', 
		replace: true, 
		templateUrl: 'common/tmpls/mfly-controlbars.html', 
		link: function(scope, element, attrs) {
			// open Controls
			scope.showControls = function() {
				scope.showControls = true;
			}


			// Directive Functionality 
			scope.closeInteractive = function() {
				mflyCommands.close();
			}
			scope.addToCollections = function() {
				mflyCommands.getInteractiveInfo().done(function(data){
				console.log("data.id :: ", data.id);
				window.location = 'mfly://control/showAddToCollection?id=' + data.id + '&x=1&y=1&w=1&h=1'; 
				});
			}
			scope.goToPreviousItem = function(){
				mflyCommands.previous();
			}
			scope.goToNextItem = function() {
				mflyCommands.next();
			}
			scope.addAnnotations = function() {
				
				// we might be able to get away with just mflyCommands.showAnnotation();
				// need to close mfly-control-bars first and then open showAnnotations();

				mflyCommands.showAnnotations(500,500,500,500);

			}
			scope.addNotes = function() {

			}
			scope.addComments = function() {

			}
			scope.addSecondScreen = function() {
				mflyCommands.showSecondScreenOptions();
			}
		}, 
		controller: function($scope) {
		}
	}
})

.directive('mflyBackImg', function(){
    return function(scope, element, attrs){
        var url = attrs.mflyBackImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
})

.directive('uiFsThumbs', function(){
	return {
		restrict: 'E', 
		scope: {
			thumb: '='
		}, 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/ui-fs.html',
		controller: function($scope) {
			console.log("thumb", $scope.thumb);
		}

	}
})



















