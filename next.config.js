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
	async headers() {
		return [
			{
				// Apply these headers to all routes in your application.
				source: '/:path*',
				headers: securityHeaders,
			},
		];
	},
};

module.exports = nextConfig;
