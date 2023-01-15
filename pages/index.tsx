import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { ControlPanel } from '../src/components/ControlPanel';
import { createCordinateGrid } from '../src/utils/logic';
import { GoogleMap } from '../src/components/map/GoogleMap';
import { MarkerGridItem } from '../src/types/markers';

const Home: NextPage = () => {
	const [gridSize, setGridSize] = useState<number>(3);
	const [distance, setDistance] = useState<number>(100);
	const [markerGrid, setMarkerGrid] = useState<MarkerGridItem[]>([]);
	const [coordinateGrid, setCoordinateGrid] = useState<google.maps.LatLngLiteral[]>([]);
	const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 43.653226, lng: -79.3831843 });
	const [keyword, setKeyword] = useState<string>('');
	const [searchResults, setSearchResults] = useState();

	useEffect(() => setCoordinateGrid(createCordinateGrid(center, gridSize, distance)), [center, gridSize, distance]);
	useEffect(() => {}, [coordinateGrid]);

	useEffect(() => {
		const markerGrid: MarkerGridItem[] = [];
		coordinateGrid.map((coord) => {
			markerGrid.push({ position: coord, rank: 0, results: [] });
		});
		setMarkerGrid(markerGrid);
	}, [coordinateGrid]);

	const onPlaceChange = (center: google.maps.LatLngLiteral) => setCenter(center);
	const onGridSizeChange = useCallback((size: number) => setGridSize(size), []);
	const onDistanceChange = useCallback((dist: number) => setDistance(dist), []);
	const handleKeywordSubmit = useCallback((key: string) => setKeyword(key), []);

	return (
		<GoogleMap center={center} markers={markerGrid}>
			<ControlPanel
				gridSize={gridSize}
				distance={distance}
				onPlaceChange={onPlaceChange}
				onGridSizeChange={onGridSizeChange}
				onDistanceChange={onDistanceChange}
				handleKeywordSubmit={handleKeywordSubmit}
			/>
		</GoogleMap>
	);
};

export default Home;
