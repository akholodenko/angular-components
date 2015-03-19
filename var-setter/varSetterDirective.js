angular.module("app").directive('varSetter', function () {
	return {
		restrict: 'AE',
		transclude: true,
		scope: {
			variable: '='
		},
		template: '{{ variable }}',
		link: function (scope, element, attrs, ctrl, transclude) {
			transclude(scope, function(clone) {
				scope.variable = clone.html();
			});
		}
	}
});