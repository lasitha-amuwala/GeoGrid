import { CgSpinner } from 'react-icons/cg';

type Props = { className?: 'string' };

export const Spinner = ({ className }: Props) => {
	return <CgSpinner className={`animate-spin ${className}`} />;
};
