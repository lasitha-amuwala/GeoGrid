/** @type {import('next').NextConfig} */

const securityHeaders = [
	{
		key: 'content_security_policy',
		value: "script-src 'self' https://maps.googleapis.com https://maps.gstatic.com; object-src 'self'",
	},
];

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	env: { MAPS_API_KEY: process.env.NEXT_PUBLIC_MAPS_API_KEY },
};

module.exports = nextConfig;
