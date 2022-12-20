import React, { useEffect } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import Input from './Input';

type Props = { onPlaceChange: (arg: google.maps.LatLngLiteral) => void };

export const AutoComplete = ({ onPlaceChange }: Props) => {
	useEffect(() => {
		if (window.google) {
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
		}
	});

	return <Input icon={<BiSearchAlt />} id='input'></Input>;
};
