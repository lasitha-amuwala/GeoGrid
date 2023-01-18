import Head from 'next/head';
import type { NextPage } from 'next';
import { useThemeContext } from './_app';
import { useCallback, useState } from 'react';
import { ControlPanel } from '../src/components/ControlPanel';
import { GoogleMap } from '../src/components/maps/GoogleMap';

const Home: NextPage = () => {
	const { darkMode } = useThemeContext();

	const [gridSize, setGridSize] = useState<number>(3);
	const [distance, setDistance] = useState<number>(100);
	const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 43.653226, lng: -79.3831843 });
	const [keyword, setKeyword] = useState<string>('');

	const onPlaceChange = (center: google.maps.LatLngLiteral) => setCenter(center);
	const onGridSizeChange = useCallback((size: number) => setGridSize(size), []);
	const onDistanceChange = useCallback((dist: number) => setDistance(dist), []);
	const handleKeywordSubmit = useCallback((key: string) => setKeyword(key), []);

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
					<GoogleMap center={center} gridSize={gridSize} distance={distance} keyword={keyword}>
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
