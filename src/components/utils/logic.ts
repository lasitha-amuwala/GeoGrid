// Returns true if odd number
const isOdd = (num: number) => num % 2;
// Converts degrees into radians
const toRad = (degree: number) => (degree * Math.PI) / 180;
// Converts radians into degrees
const toDeg = (radian: number) => (radian * 180) / Math.PI;

const pythagoras = (a: number, b: number) => {
	if (a == 0) return b;
	if (b == 0) return a;
	return Math.sqrt(a ** 2 + b ** 2);
};

const calculateAngle = (x: number, y: number) => {
	if (x === 0 && y === 0) return 0;
	const theta = 360 - toDeg(Math.atan2(y, x));
	return theta;
};

const createOffsetGrid = (size: number) => {
	if (!isOdd(size)) return [];

	const offsetArray = [];
	const halfOffsetOfGrid = Math.floor(size / 2);

	for (let i = 0; i < size; i++) {
		const columnArray = [];
		for (let j = 0; j < size; j++) {
			columnArray.push({ x: j - halfOffsetOfGrid, y: halfOffsetOfGrid - i });
		}
		offsetArray.push(columnArray);
	}

	return offsetArray;
};

const ReverseHaversine = (origin: google.maps.LatLngLiteral, angle: number, distance: number) => {
	if (distance === 0) return origin;
	if (!angle) return origin;

	const radius = 6378.1; // Radius of Eath
	const bearing = toRad(angle); // Bearing is angel converted to radians.
	const dist = distance / radius;

	const { lat, lng } = origin;

	const lat1 = toRad(lat);
	const lng1 = toRad(lng);

	//Calculate LatLng of the second coordniate
	let lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + Math.cos(lat1) * Math.sin(dist) * Math.cos(bearing));
	let lng2 =
		lng1 +
		Math.atan2(Math.sin(bearing) * Math.sin(dist) * Math.cos(lat1), Math.cos(dist) - Math.sin(lat1) * Math.sin(lat2));

	lat2 = toDeg(lat2);
	lng2 = toDeg(lng2);

	// return the second coordinate
	return { lat: lat2, lng: lng2 };
};

export const createCordinateGrid = (origin: google.maps.LatLngLiteral, size: number, distance: number) => {
	const coordinateGrid: google.maps.LatLngLiteral[] = [];
	const offsetGrid = createOffsetGrid(size);
	const dist = distance / 1000 / Math.floor(size / 2);

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			const x = offsetGrid[i][j].x;
			const y = offsetGrid[i][j].y;
			const angle = calculateAngle(x, y);
			const coordinateDistance = Math.abs(pythagoras(x * dist, y * dist));
			coordinateGrid.push(ReverseHaversine(origin, angle, coordinateDistance));
		}
	}
	return coordinateGrid;
};
