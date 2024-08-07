import { useTheme } from '../../Context/ThemeContext';
// @ts-ignore
import MoonLogo from '../Icons/moon';
import SunLogo from '../Icons/sun';

export default function Header() {
	const { theme, toggleTheme } = useTheme();

	return (
		<nav
			className={
				'sticky top-0 z-30 h-16 w-full transition-all duration-300 sm:h-20 3xl:h-24 ltr:right-0 rtl:left-0'
			}
		>
			<div className="flex h-full items-center justify-end px-4 sm:px-6 lg:px-8 3xl:px-10">
				<button onClick={toggleTheme} className="inline-block">
					{theme === 'dark' ? <SunLogo /> : <MoonLogo />}
				</button>
			</div>
		</nav>
	);
}
