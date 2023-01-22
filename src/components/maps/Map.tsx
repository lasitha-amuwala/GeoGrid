import React, { useState, useRef, useEffect, Children, isValidElement, cloneElement, memo } from 'react';
import { darkModeMap, styles } from '../../../styles/darkModeMap';
import { useThemeContext } from '../../../pages/_app';
import { MarkerGridItem } from '../../types/types';

interface MapProps extends google.maps.MapOptions {
	style?: google.maps.StyledMapType;
	center: google.maps.LatLngLiteral;
	markers: MarkerGridItem[];
	onClick?: (e: google.maps.MapMouseEvent) => void;
	onIdle?: (map: google.maps.Map) => void;
}

const Map = memo(({ center, children, markers }: React.PropsWithChildren<MapProps>) => {
	const ref = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<google.maps.Map>();
	const { darkMode } = useThemeContext();

	useEffect(() => {
		const bounds = new google.maps.LatLngBounds();
		markers.map(({ location }) => bounds.extend(location));
		map?.fitBounds(bounds, 250);
	}, [map, markers]);

	useEffect(() => map?.setCenter(center), [map, center]);
	useEffect(() => map?.setMapTypeId(darkMode ? 'darkmap' : 'roadmap'), [map, darkMode]);

	useEffect(() => {
		if (ref.current && !map) {
			const initialOptions = {
				styles,
				zoom: 18,
				zoomControl: false,
				clickableIcons: false,
				disableDefaultUI: true,
				disableDoubleClickZoom: true,
				backgroundColor: '#1f2937',
			};

			const map = new window.google.maps.Map(ref.current, initialOptions);
			map.mapTypes.set('darkmap', new google.maps.StyledMapType(darkModeMap, { name: 'darkmap' }));
			setMap(map);
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
});

Map.displayName = 'Map';
export default Map;
