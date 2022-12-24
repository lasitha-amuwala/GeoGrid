import Input from '../src/components/Input';
import Map from '../src/components/Map';
import Marker from '../src/components/Marker';

import type { NextPage } from 'next';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { AutoComplete } from '../src/components/AutoComplete';
import { ToggleColorMode } from '../src/components/ToggleColorMode';
import { createCordinateGrid } from '../src/components/utils/logic';
import { FaGithub } from 'react-icons/fa';
import { TbGridDots } from 'react-icons/tb';
import { RiPinDistanceFill } from 'react-icons/ri';
import { BiKey } from 'react-icons/bi';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { CgSpinner as Spinner } from 'react-icons/cg';

const Home: NextPage = () => {
	const [isOpen, setOpen] = useState<boolean>(true);
	const [gridSize, setGridSize] = useState<number>(3);
	const [distance, setDistance] = useState<number>(100);
	const [darkMode, setDarkMode] = useState<boolean>(true);
	const [mapLoaded, setMapLoaded] = useState<Boolean>(false);
	const [distanceText, setDistanceText] = useState<number>(100);
	const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 43.653226, lng: -79.3831843 });
	const [coordinateGrid, setCoordinateGrid] = useState<google.maps.LatLngLiteral[]>([]);

	useEffect(() => setCoordinateGrid(createCordinateGrid(center, gridSize, distance)), [center, gridSize, distance]);

	const toggleIsOpen = useCallback(() => setOpen(!isOpen), [isOpen]);
	const toggleDarkMode = useCallback(() => setDarkMode(!darkMode), [darkMode]);
	const onPlaceChange = (newCenter: google.maps.LatLngLiteral) => setCenter(newCenter);

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
		if (status === Status.LOADING) return <LoadingComponent />;
		setMapLoaded(true);
		return (
			<Map center={center} darkMode={darkMode} grid={coordinateGrid}>
				{coordinateGrid?.map((coord, i) => (
					<Marker position={coord} key={i} />
				))}
			</Map>
		);
	};

	const increaseGridSize = () => {
		if (gridSize >= 15) return;
		setGridSize((gridSize) => gridSize + 2);
	};

	const decreaseGridSize = () => {
		if (gridSize <= 3) return;
		setGridSize((gridSize) => gridSize - 2);
	};

	const increaseDistance = () => {
		setDistance((distance) => distance + 50);
	};

	const decreaseDistance = () => {
		if (distance - 50 < 50) return;
		setDistance((distance) => distance - 50);
	};

	const onDistanceChange = (e: any) => {
		setDistanceText(e.target.value);
	};

	return (
		<div className={`${darkMode && 'dark'} h-[100dvh] relative overflow-hidden bg-gray-800`}>
			<Wrapper
				apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY ?? ''}
				libraries={['places']}
				version='weekly'
				render={mapRenderer}
			/>
			{mapLoaded && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.25 }}
					className='h-auto w-auto sm:w-[450px] bg-white/[80%] dark:bg-gray-900/[80%] absolute bottom-0 left-0 right-0 backdrop-blur-xl rounded-2xl mx-3 my-7 sm:mx-10 px-5 py-5 shadow-2xl overflow-hidden'>
					<div className='flex flex-col text-black dark:text-white'>
						<div className='flex flex-row gap-3 items-center'>
							<h2 className='font-bold text-4xl flex-grow'>GeoGrid</h2>
							<button>
								<a className='text-2xl'>
									<FaGithub />
								</a>
							</button>
							<ToggleColorMode darkMode={darkMode} toggle={toggleDarkMode} />
							<button
								onClick={toggleIsOpen}
								className='rounded-full p-2 text-[22px] buttonColor transition-colors duration-200'>
								{isOpen ? <MdExpandMore /> : <MdExpandLess />}
							</button>
						</div>
						<AnimatePresence initial={false}>
							{isOpen && (
								<motion.div initial={{ height: 0 }} animate={{ height: 240 }} exit={{ height: 0 }}>
									<div className='flex flex-col gap-5 overflow-hidden pt-5'>
										<AutoComplete onPlaceChange={onPlaceChange} />
										<Input icon={<BiKey />} placeholder='Enter a search keyword' />
										<div className='flex gap-7'>
											<div className='flex flex-col'>
												<h2 className='flex-grow font-medium mb-2'>Grid Size</h2>
												<div className='flex gap-1'>
													<Input icon={<TbGridDots />} value={`${gridSize} x ${gridSize}`} readOnly />
													<div className='flex flex-col gap-1'>
														<button
															className='px-[2px] rounded-t-md text-[18px] buttonColor transition-colors duration-200'
															onClick={increaseGridSize}>
															<MdExpandLess />
														</button>
														<button
															className='px-[2px] rounded-b-md text-[18px] buttonColor transition-colors duration-200'
															onClick={decreaseGridSize}>
															<MdExpandMore />
														</button>
													</div>
												</div>
												<p className='text-xs text-gray-500 py-1'>Number of points</p>
											</div>
											<div className='flex flex-col'>
												<h2 className='flex-grow font-medium mb-2'>Distance</h2>
												<div className='flex gap-1'>
													<Input icon={<RiPinDistanceFill />} value={distanceText} onChange={onDistanceChange} />
													<div className='flex flex-col gap-1'>
														<button
															className='px-[2px] rounded-t-md text-[18px] buttonColor transition-colors duration-200'
															onClick={increaseDistance}>
															<MdExpandLess />
														</button>
														<button
															className='px-[2px] rounded-b-md text-[18px] buttonColor transition-colors duration-200'
															onClick={decreaseDistance}>
															<MdExpandMore />
														</button>
													</div>
												</div>
												<p className='text-xs text-gray-500 py-1'>Search Distance (meters)</p>
											</div>
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default Home;
