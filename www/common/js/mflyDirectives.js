angular.module('myDirectives', [])

.directive('mflyBackImg', function(){
	return function(scope, element, attrs) {
		var url = attrs.backImg; 
		element.css({
			'background-image': 'url(' + url + ')',
			'background-size': 'cover'
		});
	}
})

.directive('mflyLogo', function(){
	return {
		restrict: 'E', 
		scope: {
			width: '@'
		},
		template: '<img src="common/img/logo.png">',
		link: function(scope, element, attrs) {
			attrs.width = 
			attrs.logo = 
			element.css({
				'width': attrs.width,
				'height': 'auto',
				'z-index': '10',
				'position': 'absolute',
				'top':'15px',
				'left':'15px'
			});
		}
	}
})