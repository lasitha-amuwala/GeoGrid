import { useEffect, useState } from 'react';
import OverlayView from './overlay/OverlayView';
import { Spinner } from './Spinner';

interface MarkerProps {
	map?: google.maps.Map;
	rank: number;
	originId: string;
	position: google.maps.LatLngLiteral;
	data: any;
}

const markerColors = [
	'#00c6ff',
	'#01B800',
	'#21BF00',
	'#41C600',
	'#5FCD00',
	'#7CD400',
	'#98DB00',
	'#B2E200',
	'#CAEA00',
	'#DFF100',
	'#F1F800',
	'#FFFE00',
	'#FFF400',
	'#FFE600',
	'#FFD300',
	'#FFBB00',
	'#FF9F00',
	'#FF7E00',
	'#FF5800',
	'#FF2D00',
	'#FF0000',
];

export const Marker = ({ map, data, originId, position }: MarkerProps) => {
	const [clicked, setClicked] = useState(false);
	const [rank, setRank] = useState(0);
	const toggleClicked = () => setClicked(!clicked);

	const renderLabel = () => {
		// if (data) {
		// 	return data.isLoading ? <Spinner /> : rank;
		// } else {
		// 	return 0;
		// }
		return rank;
	};

	useEffect(() => {
		if (data.data) {
			console.log(originId);
			const rank = data.data.results.findIndex((result: any) => result.place_id == originId) + 1;
			console.log(rank);
			setRank(rank);
		}
	}, [data]);

	return (
		<>
			{map && (
				<OverlayView position={position} map={map}>
					<button
						style={{ backgroundColor: markerColors[rank] }}
						onClick={toggleClicked}
						className={`text-black font-medium rounded-full overflow-hidden outline-1 outline outline-black/40 hover:scale-[1.2] hover:bg-white/10 transition-all duration-150 shadow-md`}>
						<div className={`w-10 h-10 flex justify-center items-center text-lg`}>{renderLabel()}</div>
					</button>
				</OverlayView>
			)}
		</>
	);
};
