import Head from 'next/head';
import type { NextPage } from 'next';
import { useThemeContext } from './_app';
import { useCallback, useMemo, useState } from 'react';
import { ControlPanel } from '../src/components/ControlPanel';
import { GoogleMap } from '../src/components/maps/GoogleMap';
import { createCordinateGrid } from '../src/utils/logic';
import { useQueries } from '@tanstack/react-query';
import { PlaceType } from '../src/types/types';

const Home: NextPage = () => {
	const { darkMode } = useThemeContext();

	const [gridSize, setGridSize] = useState<number>(3);
	const [distance, setDistance] = useState<number>(100);
	const [keyword, setKeyword] = useState<string>('');
	const [place, setPlace] = useState<PlaceType>({
		position: { lat: 43.653226, lng: -79.3831843 },
		placeId: 'ChIJLf8zWebR5zsRkVxdjd6rbKI',
	});

	const onPlaceChange = (place: PlaceType) => setPlace(place);
	const onGridSizeChange = useCallback((size: number) => setGridSize(size), []);
	const onDistanceChange = useCallback((dist: number) => setDistance(dist), []);
	const handleKeywordSubmit = useCallback((key: string) => setKeyword(key), []);
	const nearbySearchFn = (pos: google.maps.LatLngLiteral) =>
		fetch(`/api/nearbySearch?pos=${pos.lat},${pos.lng}&key=${keyword}`).then(async (res) => await res.json());

	const coordinateGrid = useMemo(
		() => createCordinateGrid(place.position, gridSize, distance),
		[place.position, gridSize, distance]
	);

	const nearbySearchData = useQueries({
		queries: coordinateGrid.map((position) => ({
			queryKey: [keyword, `${position.lat},${position.lng}`],
			queryFn: () => nearbySearchFn(position),
			enabled: !!keyword,
		})),
	});

	const markerDataGrid = coordinateGrid.map((coord, i) => ({
		location: coord,
		data: nearbySearchData[i],
		rank: 0,
	}));

	return (
		<>
			<Head>
				<title>GeoGrid</title>
				<meta name='description' content='Ranking google listing by keywords on a grid' />
				<meta name='theme-color' content='#111827' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<div className={`${darkMode && 'dark'} h-[100dvh] relative overflow-hidden bg-gray-800`}>
					<GoogleMap center={place.position} originId={place.placeId} markersGrid={markerDataGrid}>
						<ControlPanel
							gridSize={gridSize}
							distance={distance}
							onPlaceChange={onPlaceChange}
							onGridSizeChange={onGridSizeChange}
							onDistanceChange={onDistanceChange}
							handleKeywordSubmit={handleKeywordSubmit}
						/>
					</GoogleMap>
				</div>
			</main>
		</>
	);
};

export default Home;
