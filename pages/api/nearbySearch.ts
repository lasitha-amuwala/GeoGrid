import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { pos: position, key: keyword } = req.query;
	console.log(req.query);
	if (!position || !keyword) {
		res.status(400).json({ error: 'invalid request' });
		return;
	}

	const params = new URLSearchParams({
		location: position as string,
		radius: '1500',
		type: 'establishment',
		keyword: keyword as string,
	});

	const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
	const url = `${baseUrl}${params.toString()}&key=${process.env.MAPS_SERVER_API_KEY}`;
	res.status(400).json({ error: 'invalid request' });
	// fetch(url)
	// 	.then(async (res) => await res.json())
	// 	.then((ress) => res.status(200).send(ress));
};

export default handler;
