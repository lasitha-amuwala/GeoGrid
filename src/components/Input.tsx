import React from 'react';

type Props = {
	placeholder?: string;
	icon: React.ReactNode;
	onChange?: () => void;
	value?: string;
	[key: string]: any;
};

const Input = ({ placeholder, icon, onChange, value, ...rest }: Props) => {
	return (
		<div className='relative w-full'>
			<div className='absolute h-10 items-center w-10 justify-center text-center'>
				<div className='h-full w-full p-3'>{icon}</div>
			</div>
			<input
				{...rest}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className='w-full pl-10 pr-4 border border-transparent focus-visible:bg-transparent focus-visible:border-[#63b3ed]'
			/>
		</div>
	);
};

export default Input;
