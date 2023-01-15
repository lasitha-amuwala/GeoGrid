import React, { PropsWithChildren } from 'react';
import { useThemeContext } from '../../../pages/_app';
import { CgSpinner as Spinner } from 'react-icons/cg';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { motion } from 'framer-motion';
import Map from './Map';
import { Marker } from '../Marker';
import { MarkerGridItem } from '../../types/markers';

type Props = PropsWithChildren<{
	center: google.maps.LatLngLiteral;
	markers: MarkerGridItem[];
}>;

export const GoogleMap = ({ center, markers, children }: Props) => {
	const { darkMode } = useThemeContext();

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

	const render = (status: Status) => {
		if (status === Status.FAILURE) return <ErrorComponent />;
		return <LoadingComponent />;
	};

	return (
		<div className={`${darkMode && 'dark'} h-[100dvh] relative overflow-hidden bg-gray-800`}>
			<Wrapper apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY!} libraries={['places']} render={render}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className='w-full h-full'>
					<Map center={center} markers={markers}>
						{markers?.map(({ position, rank }, i) => (
							<Marker position={position} rank={rank} />
						))}
						{children}
					</Map>
				</motion.div>
			</Wrapper>
		</div>
	);
};
