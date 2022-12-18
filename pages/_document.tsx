import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
	return (
		<Html lang='en'>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
			<script
				async
				src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAjx8jdzhqVLKpx6e22kgFJZOHpVk-uqVo&libraries=places'></script>
		</Html>
	);
};

export default Document;
