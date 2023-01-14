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

	const initialOptions = {
		styles,
		zoom: 18,
		zoomControl: false,
		disableDefaultUI: true,
		backgroundColor: '#1f2937',
	};

	useEffect(() => {
		const bounds = new google.maps.LatLngBounds();
		grid.map((coord) => bounds.extend(coord));
		map?.fitBounds(bounds, 250);
	}, [map, grid]);

	useEffect(() => map?.setCenter(center), [map, center]);
	useEffect(() => map?.setMapTypeId(darkMode ? 'darkmap' : 'roadmap'), [map, darkMode]);

	useEffect(() => {
		if (ref.current && !map) {
			const map = new window.google.maps.Map(ref.current, initialOptions);
			map?.mapTypes.set('darkmap', new google.maps.StyledMapType(darkModeMap, { name: 'darkmap' }));
			setMap(map);
		}
	}, [ref, map]);

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
