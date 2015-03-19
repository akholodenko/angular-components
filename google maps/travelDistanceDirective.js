angular.module("app").directive('travelDistance', ['distanceService',
	function (distanceService) {
		return {
			restrict: 'AE',
			replace: true,
			scope: {
				fromLatitude: '@',
				fromLongitude: '@',
				toLatitude: '@',
				toLongitude: '@',
			},
			template: '<span ng-bind="distanceText"></span>',
			link: function(scope, element, attrs) {
				scope.distanceText = '';

				distanceService.fromTo(
					scope.fromLatitude, scope.fromLongitude,
					scope.toLatitude, scope.toLongitude).then(function(response) {
						if(response.distance && response.duration)
							scope.distanceText = response.distance + '. (' + response.duration + ') apart';
				});
			}
		}
	}
]);