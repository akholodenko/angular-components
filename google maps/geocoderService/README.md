# angular-components:
# Google Maps GeocoderService

Geocoder Service
---
Wraps the google maps Geocoder functionality.

**Functions**

* INPUT: fromTo(query)
* OUTPUT: { neighborhood: [string], street_number: [string], street_name: [string], street_address: [string], city: [string], state: [string], zipcode: [string], lat: [float], lng: [float], county: [string] }

**Sample**
A sample working service is in demoController.js.

```
geocoderService.findDetails("501 Folsom, SF").then(function (location) {
    console.log(location);
    // location OBJECT:
    // {
    //     alias: "501-folsom-st-san-francisco-ca-94105-usa",
    //     city: "San Francisco",
    //     county: "San Francisco County",
    //     formatted_address: "501 Folsom St, San Francisco, CA 94105, USA",
    //     lat: 37.786958,
    //     lng: -122.39446199999998,
    //     neighborhood: "South Beach",
    //     state: "CA",
    //     street_address: "501 Folsom St",
    //     street_name: "Folsom St",
    //     street_number: "501",
    //     zipcode: "94105"
    // }
});
```				
