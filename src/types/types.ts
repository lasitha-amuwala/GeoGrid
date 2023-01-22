export interface MarkerGridItem {
	location: google.maps.LatLngLiteral;
	rank: number;
	data?: any;
}

export type PlaceType = {
	position: google.maps.LatLngLiteral;
	placeId: string;
};
