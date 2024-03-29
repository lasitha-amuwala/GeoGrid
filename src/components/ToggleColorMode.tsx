import { MdLightMode } from 'react-icons/md';
import { useThemeContext } from '../../pages/_app';

export const ToggleColorMode = () => {
	const { darkMode, setDarkMode } = useThemeContext();
	const toggleDarkMode = () => setDarkMode(!darkMode);

	return (
		<button
			aria-label='toggle dark mode'
			className='rounded-full p-2 text-[20px] buttonColor transition-colors duration-200'
			onClick={toggleDarkMode}>
			{darkMode ? (
				<MdLightMode />
			) : (
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-5 h-5'>
					<path
						fillRule='evenodd'
						d='M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z'
						clipRule='evenodd'
					/>
				</svg>
			)}
		</button>
	);
};
