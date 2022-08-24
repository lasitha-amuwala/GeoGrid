import { useState, useRef, useEffect } from 'react';
import { darkModeMap } from '../../styles/darkModeMap';

interface MapProps extends google.maps.MapOptions {
	style?: google.maps.StyledMapType;
	onClick?: (e: google.maps.MapMouseEvent) => void;
	onIdle?: (map: google.maps.Map) => void;
	children?: React.ReactNode;
	center: google.maps.LatLngLiteral;
	zoom: number;
}

const Map = ({ center, zoom }: MapProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<google.maps.Map>();

// const baseMap = new google.maps.S
	const darkMap = new google.maps.StyledMapType(darkModeMap, { name: 'darkMode' });

	useEffect(() => {
		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					center,
					zoom,
					mapTypeId: 'darkMode',
					disableDefaultUI: true,
				})
			);
		}
		map?.mapTypes.set('darkMode', darkMap);
		map?.setMapTypeId('darkMode');
	}, [ref, map]);

	return <div ref={ref} id='map'></div>;
};

export default Map;
