import React, { useEffect, useState } from 'react';
import Input from './Input';
import { MdLocationPin } from 'react-icons/md';
import { PlaceType } from '../../types/types';

type Props = { onPlaceChange: (arg: PlaceType) => void };

export const AutoComplete = ({ onPlaceChange }: Props) => {
	useEffect(() => {
		console.log('init');
		const input = document.getElementById('input') as HTMLInputElement;
		const options = { fields: ['place_id', 'address_components', 'formatted_address', 'geometry', 'name', 'icon'] };
		const autocomplete = new google.maps.places.Autocomplete(input, options);

		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();
			if (place.geometry && place.geometry.location) {
				onPlaceChange({
					position: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
					placeId: place.place_id!,
				});
			}
		});
	}, []);

	return <Input icon={<MdLocationPin />} id='input'></Input>;
};
