import { useTheme } from '../../Context/ThemeContext';
// @ts-ignore
import { ReactComponent as MoonLogo } from '../Icons/moon.svg';
// @ts-ignore
import { ReactComponent as SunLogo } from '../Icons/sun.svg';

export default function Header() {
	const { theme, toggleTheme } = useTheme();

	return (
		<nav
			className={
				'sticky top-0 z-30 h-16 w-full transition-all duration-300 ltr:right-0 rtl:left-0 sm:h-20 3xl:h-24'
			}
		>
			<div className="flex h-full items-center justify-end px-4 sm:px-6 lg:px-8 3xl:px-10">
				<button onClick={toggleTheme} className="inline-block">
					{theme === 'dark' ? <SunLogo /> : <MoonLogo />}
				</button>
				{/* <div>{{ theme.toString() }}</div> */}
			</div>
		</nav>
	);
}
