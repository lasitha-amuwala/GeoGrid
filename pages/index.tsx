import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { useThemeContext } from './_app';
import { CgSpinner as Spinner } from 'react-icons/cg';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { ControlPanel } from '../src/components/ControlPanel';
import { createCordinateGrid } from '../src/utils/logic';
import Map from '../src/components/Map';
import { Marker } from '../src/components/Marker';

const Home: NextPage = () => {
	const { darkMode } = useThemeContext();
	const [gridSize, setGridSize] = useState<number>(3);
	const [distance, setDistance] = useState<number>(100);
	const [coordinateGrid, setCoordinateGrid] = useState<google.maps.LatLngLiteral[]>([]);
	const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 43.653226, lng: -79.3831843 });
	const [keyword, setKeyword] = useState<string>('');
	const [searchResults, setSearchResults] = useState();

	useEffect(() => setCoordinateGrid(createCordinateGrid(center, gridSize, distance)), [center, gridSize, distance]);
	// useEffect(() => setSearchResults(getNearbySearch(coordinateGrid, keyword)), []);

	const onPlaceChange = (center: google.maps.LatLngLiteral) => setCenter(center);
	const onGridSizeChange = useCallback((size: number) => setGridSize(size), []);
	const onDistanceChange = useCallback((dist: number) => setDistance(dist), []);
	const handleKeywordSubmit = useCallback((key: string) => setKeyword(key), []);

	const LoadingComponent = () => (
		<div className='w-full h-full justify-center items-center text-center bg-gray-800 flex flex-col gap-7'>
			<h1 className='text-5xl md:text-7xl font-bold'>GeoGrid</h1>
			<Spinner className='animate-spin text-5xl' />
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

	const mapRenderer = (status: Status) => {
		if (status === Status.FAILURE) return <ErrorComponent />;
		return <LoadingComponent />;
	};

	return (
		<div className={`${darkMode && 'dark'} h-[100dvh] relative overflow-hidden bg-gray-800`}>
			<Wrapper apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY!} libraries={['places']} render={mapRenderer}>
				<Map center={center} grid={coordinateGrid}>
					{coordinateGrid?.map((coord, i) => (
						<Marker position={coord} />
					))}
				</Map>
				<ControlPanel
					gridSize={gridSize}
					distance={distance}
					onPlaceChange={onPlaceChange}
					onGridSizeChange={onGridSizeChange}
					onDistanceChange={onDistanceChange}
					handleKeywordSubmit={handleKeywordSubmit}
				/>
			</Wrapper>
		</div>
	);
};

export default Home;
