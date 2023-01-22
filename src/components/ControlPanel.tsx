import { ChangeEvent, FormEvent, useState } from 'react';
import { AutoComplete } from './input/AutoComplete';
import { ToggleColorMode } from './ToggleColorMode';
import { AnimatePresence, motion } from 'framer-motion';
import { BiKey, BiSearchAlt } from 'react-icons/bi';
import { FaGithub } from 'react-icons/fa';
import { TbGridDots } from 'react-icons/tb';
import { RiPinDistanceFill } from 'react-icons/ri';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

import Input from './input/Input';
import { Spinner } from './Spinner';
import { PlaceType } from '../types/types';

interface Props {
	gridSize: number;
	distance: number;
	onPlaceChange: (arg: PlaceType) => void;
	onGridSizeChange: (arg: number) => void;
	onDistanceChange: (arg: number) => void;
	handleKeywordSubmit: (arg: string) => void;
}

export const ControlPanel = ({
	gridSize,
	distance,
	onPlaceChange,
	onGridSizeChange,
	onDistanceChange,
	handleKeywordSubmit,
}: Props) => {
	const [isOpen, setOpen] = useState<boolean>(true);
	const [keyword, setKeyword] = useState<string>('');
	const [distanceText, setDistanceText] = useState<number>(100);
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);

	const toggleIsOpen = () => setOpen(!isOpen);

	const increaseGridSize = () => {
		if (gridSize >= 15) return;
		onGridSizeChange(gridSize + 2);
	};

	const decreaseGridSize = () => {
		if (gridSize <= 3) return;
		onGridSizeChange(gridSize - 2);
	};

	const increaseDistance = () => {
		onDistanceChange(distance + 50);
	};

	const decreaseDistance = () => {
		if (distance - 50 < 50) return;
		onDistanceChange(distance - 50);
	};

	const onKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setKeyword(event.target.value);
	};

	const onKeywordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleKeywordSubmit(keyword);
		setButtonLoading(true);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.15 }}
			className='h-auto w-auto sm:w-[450px] bg-white/[80%] dark:bg-gray-900/[80%] absolute bottom-0 left-0 right-0 backdrop-blur-xl rounded-2xl mx-3 my-7 sm:mx-10 px-5 py-5 shadow-2xl overflow-hidden'>
			<div className='flex flex-col text-black dark:text-white'>
				<div className='flex flex-row gap-3 items-center'>
					<h2 className='font-bold text-4xl flex-grow'>GeoGrid</h2>
					<button>
						<a className='text-2xl'>
							<FaGithub />
						</a>
					</button>
					<ToggleColorMode />
					<button
						onClick={toggleIsOpen}
						className='rounded-full p-2 text-[22px] buttonColor transition-colors duration-200'>
						{isOpen ? <MdExpandMore /> : <MdExpandLess />}
					</button>
				</div>
				<AnimatePresence initial={false}>
					{isOpen && (
						<motion.div initial={{ height: 0 }} animate={{ height: 240 }} exit={{ height: 0 }}>
							<div className='flex flex-col gap-5 overflow-hidden pt-5'>
								<AutoComplete onPlaceChange={onPlaceChange} />
								<form className='flex gap-1' onSubmit={onKeywordSubmit}>
									<div className='grow'>
										<Input
											icon={<BiKey />}
											value={keyword}
											onChange={onKeywordChange}
											placeholder='Enter a search keyword'
										/>
									</div>
									<button className='p-2 px-[10px] rounded-md buttonColor text-xl' type='submit'>
										{buttonLoading ? <Spinner /> : <BiSearchAlt />}
									</button>
								</form>
								<div className='flex gap-7'>
									<div className='flex flex-col'>
										<h2 className='flex-grow font-medium mb-2'>Grid Size</h2>
										<div className='flex gap-1'>
											<Input icon={<TbGridDots />} value={`${gridSize} x ${gridSize}`} readOnly />
											<div className='flex flex-col gap-1'>
												<button
													className='px-[2px] rounded-t-md text-[18px] buttonColor transition-colors duration-200'
													onClick={increaseGridSize}>
													<MdExpandLess />
												</button>
												<button
													className='px-[2px] rounded-b-md text-[18px] buttonColor transition-colors duration-200'
													onClick={decreaseGridSize}>
													<MdExpandMore />
												</button>
											</div>
										</div>
										<p className='text-xs text-gray-500 py-1'>Number of points</p>
									</div>
									<div className='flex flex-col'>
										<h2 className='flex-grow font-medium mb-2'>Distance</h2>
										<div className='flex gap-1'>
											<Input icon={<RiPinDistanceFill />} value={distanceText} onChange={onDistanceChange} />
											<div className='flex flex-col gap-1'>
												<button
													className='px-[2px] rounded-t-md text-[18px] buttonColor transition-colors duration-200'
													onClick={increaseDistance}>
													<MdExpandLess />
												</button>
												<button
													className='px-[2px] rounded-b-md text-[18px] buttonColor transition-colors duration-200'
													onClick={decreaseDistance}>
													<MdExpandMore />
												</button>
											</div>
										</div>
										<p className='text-xs text-gray-500 py-1'>Search Distance (meters)</p>
									</div>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
};
