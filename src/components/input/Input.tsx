import { ReactNode } from 'react';

type Props = {
	placeholder?: string;
	icon?: ReactNode;
	onChange?: (arg: any) => void;
	value?: string | number;
	[key: string]: any;
};

const Input = ({ placeholder, icon, onChange, value, ...rest }: Props) => {
	return (
		<div className='relative'>
			{icon && (
				<div className='absolute h-10 items-center w-10 justify-center text-center'>
					<div className='h-full w-full p-3'>{icon}</div>
				</div>
			)}
			<input
				{...rest}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={`w-full ${icon && 'pl-10 pr-4'}`}
			/>
		</div>
	);
};

export default Input;
