import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const lat = -33.8670522;
	const lng = 151.1957362;

	const params = new URLSearchParams({
		location: `${lat.toString()},${lng.toString()}`,
		radius: '1500',
		type: 'resturaunt',
		keyword: 'cruise',
	});
	const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
	const url = `${baseUrl}${params.toString()}&key=${process.env.MAPS_SERVER_API_KEY}`;

	axios(url).then((ress) => {
		res.status(200).json(ress.data);
	});
};
export default handler;
