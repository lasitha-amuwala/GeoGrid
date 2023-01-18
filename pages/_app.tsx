import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { createContext, useContext, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

interface ThemeContextInterface {
    darkMode: boolean;
    setDarkMode: React.Dispatch<boolean>;
}

export const ThemeContext = createContext<ThemeContextInterface>({} as ThemeContextInterface);
export const useThemeContext = () => useContext(ThemeContext);

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

function MyApp({ Component, pageProps }: AppProps) {
    const [darkMode, setDarkMode] = useState<boolean>(true);

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
                <Component {...pageProps} />
                <Analytics />
            </ThemeContext.Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default MyApp;
