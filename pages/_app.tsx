import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { createContext, useContext, useState } from 'react';

interface ThemeContextInterface {
	darkMode: boolean;
	setDarkMode: React.Dispatch<boolean>;
}

export const ThemeContext = createContext<ThemeContextInterface>({} as ThemeContextInterface);
export const useThemeContext = () => useContext(ThemeContext);

function MyApp({ Component, pageProps }: AppProps) {
	const [darkMode, setDarkMode] = useState<boolean>(true);

	return (
		<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
			<Component {...pageProps} />
			<Analytics />
		</ThemeContext.Provider>
	);
}

export default MyApp;
