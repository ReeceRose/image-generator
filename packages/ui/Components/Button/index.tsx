type Props = {
	clickHandler: () => void;
	children: React.ReactNode;
};

export default function Button({ clickHandler, children }: Props) {
	return (
		<button
			onClick={clickHandler}
			className={
				'h-10 w-full items-center justify-center overflow-hidden rounded-md border-brand bg-brand px-7 text-center text-xs font-medium tracking-wider text-white outline-none transition-all hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none sm:rounded-lg sm:px-9 sm:text-sm'
			}
		>
			{children}
		</button>
	);
}
