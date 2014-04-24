// Adds the coordinates of the location to the value of the coordinate field
function GetLocation(location) {
				$("#observation_coordinates").attr('value', "lat=" + location.coords.latitude + ", lon=" + location.coords.longitude);
				insert_city_name(location);
			}

// Determines the city name and adds it to the value of the form
function insert_city_name(location) {
	var geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(location.coords.latitude,location.coords.longitude);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
            	var str = '';
            	var i = 0, len = results.length, loop = true;
            	while (i < len && loop) {
      for (var j = 0, len2 = results[i].address_components.length; j < len2; j++) {
                    	if (results[i].address_components[j].types[0] == 'administrative_area_level_3') {
                        	str = results[i].address_components[j].long_name;
                        	loop = false;
                        	break;
                    	}
                    	else
                        	str = '';
                	}
                	i++;
   	 
   	 }

  }
 	else {
  	alert('Geocoder failed due to: ' + status);
	}
 
 			$("#observation_location").attr('value', str);
 } );

};