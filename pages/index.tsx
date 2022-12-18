import type { NextPage } from 'next';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { BiKey } from 'react-icons/bi';
import { FaMoon, FaGithub } from 'react-icons/fa';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SearchBar } from '../src/components/SearchBar';
import Input from '../src/components/Input';
import Map from '../src/components/Map';

const Home: NextPage = () => {
	const [isOpen, setOpen] = useState(true);
	const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 43.653226, lng: -79.3831843 });

	// const toggleDarkModeIcon = <FaMoon color='#A0AEC0' />;
	const toggleIsOpen = () => setOpen(!isOpen);

	const onPlaceChange = (newCenter: google.maps.LatLngLiteral) => {
		console.log('new', newCenter);
		setCenter(newCenter);
	};

	const mapRenderer = (status: Status) => {
		switch (status) {
			case Status.LOADING:
				return <div>DICK</div>;
			case Status.FAILURE:
				return <div>DICK</div>;
			case Status.SUCCESS:
				return <Map center={center} />;
		}
	};

	return (
		<div className='h-screen relative max-h-screen overflow-hidden'>
			<Wrapper apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY ?? ''} render={mapRenderer}></Wrapper>
			<motion.div
				layout='position'
				className='h-auto w-[450px] bg-black bg-opacity-40 absolute bottom-0 left-0 backdrop-blur-xl rounded-2xl my-10 mx-7 px-7 py-5 shadow-2xl'>
				<div className='flex flex-col gap-5 '>
					<div className='flex flex-row gap-3 items-center'>
						<h2 className='font-bold text-4xl flex-grow'>GeoGrid</h2>
						<button>
							<a className='text-2xl'>
								<FaGithub />
							</a>
						</button>
						<button className='rounded-full p-2 bg-white/5 text-[22px] hover:bg-white/10 active:bg-white/20  transition-colors duration-200'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-5 h-5'>
								<path
									fillRule='evenodd'
									d='M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z'
									clipRule='evenodd'
								/>
							</svg>
						</button>
						<button
							onClick={toggleIsOpen}
							className='rounded-full p-2 bg-white/5 text-[22px] hover:bg-white/10 active:bg-white/20 transition-colors duration-200'>
							{isOpen ? <MdExpandMore /> : <MdExpandLess />}
						</button>
					</div>
					{isOpen && (
						<motion.div initial={{ visibility: 'hidden' }} animate={{ visibility: 'visible' }}>
							<div className='flex flex-col gap-5 pt-3 overflow-hidden'>
								<SearchBar onPlaceChange={onPlaceChange} />
								<Input icon={<BiKey />} placeholder='Enter a search keyword' />
							</div>
						</motion.div>
					)}
				</div>
			</motion.div>
		</div>
	);
};

export default Home;
