import type { NextPage } from 'next';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { BiKey } from 'react-icons/bi';
import { FaGithub } from 'react-icons/fa';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { AutoComplete } from '../src/components/AutoComplete';
import { ToggleColorMode } from '../src/components/ToggleColorMode';
import { Marker } from '../src/components/Marker';
import { createCordinateGrid } from '../src/components/utils/logic';
import Input from '../src/components/Input';
import Map from '../src/components/Map';

const Home: NextPage = () => {
	const [isOpen, setOpen] = useState(true);
	const [darkMode, setDarkMode] = useState(true);
	const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 43.653226, lng: -79.3831843 });

	const toggleIsOpen = () => setOpen(!isOpen);
	const toggleDarkMode = () => setDarkMode(!darkMode);
	const onPlaceChange = (newCenter: google.maps.LatLngLiteral) => setCenter(newCenter);
	const offsetGrid = createCordinateGrid(center, 3, 0.5);

	const mapRenderer = (status: Status) => {
		switch (status) {
			case Status.LOADING:
				return <div>Loading...</div>;
			case Status.FAILURE:
				return <div>Error</div>;
			case Status.SUCCESS:
				return (
					<Map center={center} darkMode={darkMode}>
						{offsetGrid.map((coord) => (
							<Marker position={coord} />
						))}
					</Map>
				);
		}
	};

	return (
		<div className={`${darkMode && 'dark'} h-screen relative max-h-screen overflow-hidden`}>
			<Wrapper apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY ?? ''} render={mapRenderer}></Wrapper>
			<motion.div className='h-auto w-[450px] bg-white/[70%] dark:bg-black/[35%] absolute bottom-0 left-0 backdrop-blur-xl rounded-2xl my-10 mx-10 px-5 py-5 shadow-2xl overflow-hidden'>
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
							<motion.div initial={{ height: 0 }} animate={{ height: 248 }} exit={{ height: 0 }}>
								<div className='flex flex-col gap-5 overflow-hidden pt-5'>
									<AutoComplete onPlaceChange={onPlaceChange} />
									<Input icon={<BiKey />} placeholder='Enter a search keyword' />
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</motion.div>
		</div>
	);
};

export default Home;
