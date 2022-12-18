import { useState, useRef, useEffect } from 'react';
import { darkModeMap } from '../../styles/darkModeMap';

interface MapProps extends google.maps.MapOptions {
	style?: google.maps.StyledMapType;
	onClick?: (e: google.maps.MapMouseEvent) => void;
	onIdle?: (map: google.maps.Map) => void;
	children?: React.ReactNode;
	center: google.maps.LatLngLiteral;
}

const Map = ({ center }: MapProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<google.maps.Map>();

	const zoom = 15;
	const mapType = 'darkMode';
	const darkMap = new google.maps.StyledMapType(darkModeMap, { name: 'darkMode' });
	map?.mapTypes.set('darkMode', darkMap);

	useEffect(() => initMap(), [ref, map]);
	useEffect(() => map?.setCenter(center), [center]);
	useEffect(() => map?.setMapTypeId(mapType), [mapType, map]);

	const initMap = () => {
		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					center,
					zoom,
					minZoom: zoom - 3,
					maxZoom: zoom + 3,
					mapTypeId: mapType,
					zoomControl: true,
					disableDefaultUI: true,
				} as google.maps.MapOptions)
			);
		}
	};

	return <div ref={ref} id='map'></div>;
};

export default Map;
