import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Add color mode config
const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

// Extend the theme
export const theme = extendTheme({config});
