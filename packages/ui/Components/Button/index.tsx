type Props = {
	clickHandler: () => Promise<void>;
	children: React.ReactNode;
};

export default function Button({ clickHandler, children }: Props) {
	return (
		<button
			onClick={clickHandler}
			className={
				'sm:h-13 relative inline-flex h-11 w-full shrink-0 items-center justify-center overflow-hidden rounded-md border-brand bg-brand px-7 text-center text-xs font-medium tracking-wider text-white outline-none transition-all hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none xs:w-64 sm:rounded-lg sm:px-9 sm:text-sm md:w-72'
			}
		>
			{children}
		</button>
	);
}
