import { memo, useEffect, useState } from 'react';

const Marker = memo((options: google.maps.MarkerOptions) => {
	const [marker, setMarker] = useState<google.maps.Marker>();
	const { map } = options;

	var request = {
		location: options.position as google.maps.LatLngLiteral,
		radius: 500,
		type: 'restaurant',
	};

	const service = new google.maps.places.PlacesService(map as google.maps.Map);
	service.nearbySearch(request, (results, status) => {
		if (status == google.maps.places.PlacesServiceStatus.OK && results) {
			console.log('hi', results);
		}
	});

	const circle = {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: 'red',
		fillOpacity: 0.6,
		strokeWeight: 0,
		rotation: 0,
		scale: 17,
	};

	useEffect(() => {
		if (!marker) setMarker(new google.maps.Marker());
		// remove marker from map on unmount
		return () => {
			if (marker) marker.setMap(null);
		};
	}, [marker]);

	useEffect(() => {
		if (marker) marker.setOptions({ label: '15', ...options });
	}, [marker, options]);

	return null;
});

Marker.displayName = 'Marker';
export default Marker;
