import React, { useEffect } from 'react';
import Input from './Input';
import { MdLocationPin } from 'react-icons/md';

type Props = { onPlaceChange: (arg: google.maps.LatLngLiteral) => void };

export const AutoComplete = ({ onPlaceChange }: Props) => {
	useEffect(() => {
		const input = document.getElementById('input') as HTMLInputElement;
		const options = {
			fields: ['place_id', 'address_components', 'formatted_address', 'geometry', 'name', 'icon'],
		};
		const autocomplete = new google.maps.places.Autocomplete(input, options);

		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();
			if (place.geometry && place.geometry.location) {
				onPlaceChange({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
			}
		});
	});

	return <Input icon={<MdLocationPin />} id='input'></Input>;
};
