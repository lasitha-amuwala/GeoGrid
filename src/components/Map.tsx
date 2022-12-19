import React, { useState, useRef, useEffect, Children, isValidElement, cloneElement } from 'react';
import { darkModeMap } from '../../styles/darkModeMap';

interface MapProps extends google.maps.MapOptions {
	style?: google.maps.StyledMapType;
	onClick?: (e: google.maps.MapMouseEvent) => void;
	onIdle?: (map: google.maps.Map) => void;
	center: google.maps.LatLngLiteral;
	darkMode: boolean;
}

const Map = ({ center, darkMode, children }: React.PropsWithChildren<MapProps>) => {
	const ref = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<google.maps.Map>();

	const zoom = 15;

	useEffect(() => initMap(), [ref, map]);
	useEffect(() => map?.setCenter(center), [center, map]);
	useEffect(() => map?.setMapTypeId(darkMode ? 'darkmap' : 'roadmap'), [darkMode, map]);

	const initMap = () => {
		const darkMap = new google.maps.StyledMapType(darkModeMap, { name: 'darkmap' });
		map?.mapTypes.set('darkmap', darkMap);

		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					center,
					zoom,

					mapTypeId: 'darkmap',
					zoomControl: true,
					disableDefaultUI: true,
				} as google.maps.MapOptions)
			);
		}
	};

	return (
		<>
			<div ref={ref} id='map' />
			{Children.map(children, (child) => {
				if (isValidElement(child)) {
					// set the map prop on the child component
					// @ts-ignore
					return cloneElement(child, { map });
				}
			})}
		</>
	);
};

export default Map;
