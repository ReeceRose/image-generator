import { useEffect, useState } from 'react';
import { createCtx } from './common';

type ThemeContext = {
	theme: string;
	toggleTheme: () => void;
};

type Props = {
	children: React.ReactNode;
};

const [useCtx, CtxProvider] = createCtx<ThemeContext>();

export const useTheme = useCtx;

export const ThemeContextProvider = ({ children }: Props) => {
	const [theme, setTheme] = useState<string>('light');

	useEffect(() => {
		let theme = 'light';
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			theme = 'dark';
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		setTheme(theme);
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		localStorage.theme = newTheme;
		if (newTheme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		setTheme(newTheme);
	};

	return (
		<CtxProvider
			value={{
				theme,
				toggleTheme
			}}
		>
			{children}
		</CtxProvider>
	);
};
