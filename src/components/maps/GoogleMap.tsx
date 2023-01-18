import React, { PropsWithChildren, useEffect, useState } from 'react';

import Map from './Map';
import { Marker } from '../Marker';
import { motion } from 'framer-motion';
import { MarkerGridItem } from '../../types/markers';
import { createCordinateGrid } from '../../utils/logic';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { useQueries, useQuery } from '@tanstack/react-query';
import { LoadingComponent } from './WrapperComponents/LoadingComponent';
import { ErrorComponent } from './WrapperComponents/ErrorComponent';

interface GoogleMapsProps {
    center: google.maps.LatLngLiteral;
    keyword: string;
    gridSize: number;
    distance: number;
}

export const GoogleMap = ({ center, gridSize, distance, keyword, children }: PropsWithChildren<GoogleMapsProps>) => {
    const [markerGrid, setMarkerGrid] = useState<MarkerGridItem[]>([]);

    const nearbySearchFn = (pos: google.maps.LatLngLiteral) => fetch(`/api/nearbySearch?pos=${pos.lat},${pos.lng}&key=${keyword}`).then(async (res) => await res.json());

    const userQueries = useQueries({
        queries: markerGrid.map(({ position }) => {
            return {
                queryKey: [keyword, position.lat, position.lng],
                queryFn: () => nearbySearchFn(position),
                enabled: !!keyword,
            };
        }),
    });

	console.log('queries', userQueries)

    useEffect(() => {
        const markerGridItems: MarkerGridItem[] = new Array(gridSize * gridSize);
        const coordinateGrid = createCordinateGrid(center, gridSize, distance);
        coordinateGrid.map((coord) => markerGridItems.push({ position: coord, rank: 0, results: [] }));
        setMarkerGrid(markerGridItems);
    }, [center, gridSize, distance]);

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
                className="w-full h-full"
            >
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
