angular.module("app").factory('geocoderService', ['$q', function($q) {
		return {
			findDetails: function (query) {
				var that = this;
				var deferred = $q.defer();
				var geocoder = new google.maps.Geocoder();

				geocoder.geocode( { 'address': query}, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) { deferred.resolve(results); }
					else { deferred.reject(status); }
				});

				return deferred.promise.then(function (results) {
					return that.parseDetails(results);
				});
			},
			parseDetails: function (results) {
				if(results === undefined || results[0] === undefined) { return null; }

				var response = { neighborhood: '', street_number: '', street_name: '', street_address: '', city: '', state: '', zipcode: '', lat: '', lng: '', county: '' };
				var details = results[0];

				for (var i = 0; i < details.address_components.length; i++) {
					switch (details.address_components[i].types[0]) {
						case "neighborhood":
							response.neighborhood = details.address_components[i].long_name;
							break;
						case "street_number":
							response.street_number = details.address_components[i].long_name;
							break;
						case "route":
							response.street_name = details.address_components[i].short_name;
							break;
						case "postal_code":
							response.zipcode = details.address_components[i].long_name;
							break;
						case "sublocality_level_1":
							response.city = details.address_components[i].long_name;
							break;
						case "locality":
							if(!response.city || !response.city.length) {
								response.city = details.address_components[i].long_name;
							}
							break;
						case "administrative_area_level_1":
							response.state = details.address_components[i].short_name;
							break;
						case "administrative_area_level_2":
							response.county = details.address_components[i].long_name;
							break;
					}
				}

				response.lat = details.geometry.location.A;
				response.lng = details.geometry.location.F;

				response.street_address = response.street_number + ' ' + response.street_name;

				if(details.formatted_address) {
					response.formatted_address = details.formatted_address;
					response.alias = response.formatted_address.replace(/,+/g, ' ').replace(/\s+/g, '-').trim().toLowerCase();
				}

				return response;
			}
		};
	}
]);
