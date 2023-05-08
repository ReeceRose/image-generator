type Props = {
	setMessage: (value: string) => void;
	label?: string;
	placeholder?: string;
	error?: string;
};

export default function Input({ setMessage, label, placeholder, error }: Props) {
	return (
		<div className="w-full text-xs sm:text-sm">
			<label>
				{label && (
					<span className="mb-2 block font-medium uppercase tracking-widest dark:text-gray-100 sm:mb-3">
						{label}
						<sup className="inline-block text-[13px] text-red-500 ltr:ml-1 rtl:mr-1">*</sup>
					</span>
				)}
				<input
					placeholder={placeholder}
					onChange={(e) => setMessage(e.target.value)}
					className="mt-1 w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm transition-shadow duration-200 placeholder:text-gray-400 invalid:border-red-500 invalid:text-red-600 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-700 dark:bg-light-dark dark:text-gray-100 dark:focus:border-gray-600 dark:focus:ring-gray-600 sm:rounded-lg"
				/>
			</label>
			{error && (
				<span role="alert" className="mt-2 block text-red-500 sm:mt-2.5">
					{error}
				</span>
			)}
		</div>
	);
}
