function get_observation_location(location) {
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

//google.maps.event.addDomListener(window, 'load', initialize);