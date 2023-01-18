import { PropsWithChildren, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { createOverlay } from '../../utils/overlay';

type OverlayProps = PropsWithChildren<{
	position: google.maps.LatLng | google.maps.LatLngLiteral;
	pane?: keyof google.maps.MapPanes;
	map: google.maps.Map;
	zIndex?: number;
}>;

export default function OverlayView({ position, pane = 'floatPane', map, zIndex, children }: OverlayProps) {
	const container = useMemo(() => {
		const div = document.createElement('div');
		div.className = 'absolute';
		div.style.translate = '-50% -50%';
		return div;
	}, []);

	const overlay = useMemo(() => {
		return createOverlay(container, pane, position);
	}, [container, pane, position]);

	useEffect(() => {
		overlay?.setMap(map);
		return () => overlay?.setMap(null);
	}, [map, overlay]);

	// to move the container to the foreground and background
	useEffect(() => {
		container.style.zIndex = `${zIndex}`;
	}, [zIndex, container]);

	return createPortal(children, container);
}
