angular.module('myDirectives', [])

.directive('mflyLogo', function(){
	return {
		restrict: 'E', 
		templateUrl: 'common/tmpls/mfly-logo.html', 
		replace: true,
		link: function(scope, element, attrs) {
			var width = attrs.imgWidth;
			console.log('Image Width:' , width);
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

.directive('mflyBackImg', function(){
	return function(scope, element, attrs) {
		var url = attrs.backImg; 
		element.css({
			'background-image': 'url(' + url + ')',
			'background-size': 'cover'
		});
	}
});




















