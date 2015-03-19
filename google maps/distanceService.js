/**	service provides location look up via google api	*/
angular.module("app").factory('distanceService', ['$q', function($q) {
	var service = new google.maps.DistanceMatrixService();

	// return promise for location lookup data
	var fromToPromise = function (origin, destination) {
		var deferred = $q.defer();	// instance of promise for typeahead suggestions

		service.getDistanceMatrix({
			origins: [origin],
			destinations: [destination],
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.IMPERIAL,
			//durationInTraffic: Boolean
		}, function (response, status) {
			if (status == google.maps.DistanceMatrixStatus.OK) { deferred.resolve(response); }
			else { deferred.reject(status); }
		});

		return deferred.promise;	// return promise for future resolution
	};

	return {
		fromTo: function(fromLatitude, fromLongitude, toLatitude, toLongitude) {
			var origin = new google.maps.LatLng(fromLatitude, fromLongitude);
			var destination = new google.maps.LatLng(toLatitude, toLongitude);

			return fromToPromise(origin, destination).then(function(response) {
				var origins = response.originAddresses;
				var destinations = response.destinationAddresses;
				var distance = '';
				var duration = '';

				for (var i = 0; i < origins.length; i++) {
					var results = response.rows[i].elements;
					for (var j = 0; j < results.length; j++) {
						var element = results[j];
						distance = element.distance.text;
						duration = element.duration.text;
						var from = origins[i];
						var to = destinations[j];
					}
				}

				return { distance: distance, duration: duration };
			});
		}
	};
}]);