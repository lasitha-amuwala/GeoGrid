import React, { PropsWithChildren, useEffect, useState } from 'react';

import Map from './Map';
import { Marker } from '../Marker';
import { motion } from 'framer-motion';
import { MarkerGridItem } from '../../types/types';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { LoadingComponent } from './WrapperComponents/LoadingComponent';
import { ErrorComponent } from './WrapperComponents/ErrorComponent';

interface GoogleMapsProps {
	center: google.maps.LatLngLiteral;
	originId: string;
	markersGrid: MarkerGridItem[];
}

export const GoogleMap = ({ center, originId, markersGrid, children }: PropsWithChildren<GoogleMapsProps>) => {
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
				<Map center={center} markers={markersGrid}>
					{markersGrid?.map(({ location, rank, data }, i) => (
						<Marker position={location} rank={rank} data={data} originId={originId} key={i} />
					))}
					{children}
				</Map>
			</motion.div>
		</Wrapper>
	);
};
