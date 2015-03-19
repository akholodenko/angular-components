# angular-components: google maps
Distance Service
---
Wraps the google maps DistanceMatrixService functionality.

**Functions**

* INPUT: fromTo(fromLatitude, fromLongitude, toLatitude, toLongitude)
* OUTPUT: { distance: [mileage in text], duration: [time in text] }

**Sample**
A sample working directive is in traveDistanceDirective.js.

```
distanceService.fromTo(
	scope.fromLatitude, scope.fromLongitude,
	scope.toLatitude, scope.toLongitude).then(function(response) {
		if(response.distance && response.duration)
			scope.distanceText = response.distance + '. (' + response.duration + ') apart';
});
```				