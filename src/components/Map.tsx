import React, { useState, useRef, useEffect, Children, isValidElement, cloneElement } from 'react';
import { darkModeMap } from '../../styles/darkModeMap';

interface MapProps extends google.maps.MapOptions {
	style?: google.maps.StyledMapType;
	onClick?: (e: google.maps.MapMouseEvent) => void;
	onIdle?: (map: google.maps.Map) => void;
	center: google.maps.LatLngLiteral;
	grid: google.maps.LatLngLiteral[];
	darkMode: boolean;
}

const Map = ({ center, darkMode, children, grid }: React.PropsWithChildren<MapProps>) => {
	const ref = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<google.maps.Map>();

	useEffect(() => map?.setCenter(center), [center, map]);
	useEffect(() => map?.setMapTypeId(darkMode ? 'darkmap' : 'roadmap'), [darkMode, map]);

	useEffect(() => {
		const bounds = new google.maps.LatLngBounds();
		grid.map((coord) => bounds.extend(coord));
		map?.fitBounds(bounds, 75);
	}, [grid, map]);

	useEffect(() => {
		const darkMap = new google.maps.StyledMapType(darkModeMap, { name: 'darkmap' });
		map?.mapTypes.set('darkmap', darkMap);

		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					center: { lat: 43.653226, lng: -79.3831843 },
					zoom: 15,
					mapTypeId: 'darkmap',
					zoomControl: false,
					disableDefaultUI: true,
				} as google.maps.MapOptions)
			);
		}
	}, [ref, map]);

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
