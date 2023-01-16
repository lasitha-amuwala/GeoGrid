import React, { PropsWithChildren, useEffect, useState } from 'react';

import Map from './Map';
import { Marker } from '../Marker';
import { motion } from 'framer-motion';
import { MarkerGridItem } from '../../types/markers';
import { createCordinateGrid } from '../../utils/logic';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Spinner } from '../Spinner';

interface GoogleMapsProps {
	center: google.maps.LatLngLiteral;
	keyword: string;
	gridSize: number;
	distance: number;
}

export const GoogleMap = ({ center, gridSize, distance, keyword, children }: PropsWithChildren<GoogleMapsProps>) => {
	const [markerGrid, setMarkerGrid] = useState<MarkerGridItem[]>([]);
	const [coordinateGrid, setCoordinateGrid] = useState<google.maps.LatLngLiteral[]>([]);

	useEffect(() => setCoordinateGrid(createCordinateGrid(center, gridSize, distance)), [center, gridSize, distance]);

	useEffect(() => {
		const markerGridItems: MarkerGridItem[] = [];
		coordinateGrid.map((coord) => {
			markerGridItems.push({ position: coord, rank: 0, results: [] });
		});
		setMarkerGrid(markerGridItems);
	}, [coordinateGrid]);

	const render = (status: Status) => {
		if (status === Status.FAILURE) return <ErrorComponent />;
		return <LoadingComponent />;
	};

	return (
		<Wrapper apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY!} libraries={['places']} render={render}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className='w-full h-full'>
				<Map center={center} markers={markerGrid}>
					{markerGrid?.map(({ position, rank }, i) => (
						<Marker position={position} rank={rank} key={i} />
					))}
					{children}
				</Map>
			</motion.div>
		</Wrapper>
	);
};

const LoadingComponent = () => (
	<div className='text-5xl w-full h-full justify-center items-center text-center bg-gray-800 flex flex-col gap-7'>
		<h1 className=' md:text-7xl font-bold'>GeoGrid</h1>
		<Spinner />
	</div>
);

const ErrorComponent = () => (
	<div className='p-10 w-full h-full justify-center text-center items-center bg-gray-800 flex flex-col gap-7'>
		<h1 className='text-7xl font-bold'>OOPS!</h1>
		<p className='text-xl md:text-3xl font-normal'>
			GeoGrid is experiencing technical difficulties. Please try again later.
		</p>
	</div>
);
