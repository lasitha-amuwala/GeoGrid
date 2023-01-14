import OverlayView from './overlay/OverlayView';

interface MarkerProps {
	map?: google.maps.Map;
	position: google.maps.LatLngLiteral;
}

export const Marker = ({ map, position }: MarkerProps) => {
	return (
		<>
			{map && (
				<OverlayView position={position} map={map}>
					<button>
						<div
							className={`bg-green-600 outline-1 outline text-black outline-black/40 w-10 h-10 rounded-full flex justify-center items-center text-lg`}>1</div>
					</button>
				</OverlayView>
			)}
		</>
	);
};
