import React, { useState, useRef, useEffect, Children, isValidElement, cloneElement, memo } from 'react';
import { darkModeMap, styles } from '../../styles/darkModeMap';
import { motion } from 'framer-motion';
import { useThemeContext } from '../../pages/_app';
interface MapProps extends google.maps.MapOptions {
	style?: google.maps.StyledMapType;
	center: google.maps.LatLngLiteral;
	grid: google.maps.LatLngLiteral[];
	onClick?: (e: google.maps.MapMouseEvent) => void;
	onIdle?: (map: google.maps.Map) => void;
}

const Map = memo(({ center, children, grid }: React.PropsWithChildren<MapProps>) => {
	const ref = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<google.maps.Map>();
	const { darkMode } = useThemeContext();

	useEffect(() => map?.setCenter(center), [center, map]);
	useEffect(() => map?.setMapTypeId(darkMode ? 'darkmap' : 'roadmap'), [darkMode, map]);

	useEffect(() => {
		const bounds = new google.maps.LatLngBounds();
		grid.map((coord) => bounds.extend(coord));
		map?.fitBounds(bounds, 250);
	}, [grid, map]);

	useEffect(() => {
		const darkMap = new google.maps.StyledMapType(darkModeMap, { name: 'darkmap' });
		map?.mapTypes.set('darkmap', darkMap);

		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					center,
					zoom: 15,
					mapTypeId: 'darkmap',
					zoomControl: false,
					disableDefaultUI: true,
					styles,
				} as google.maps.MapOptions)
			);
		}
	}, [ref, map, center]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			className='w-full h-full'>
			<div ref={ref} id='map' />
			{Children.map(children, (child) => {
				if (isValidElement(child)) {
					// set the map prop on the child component
					// @ts-ignore
					return cloneElement(child, { map });
				}
			})}
		</motion.div>
	);
});

Map.displayName = 'Map';
export default Map;
