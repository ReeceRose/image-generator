import Header from '../Components/Header';
import { ThemeContextProvider } from '../Context/ThemeContext';

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<ThemeContextProvider>
			<div>
				<Header />
				<main
					className={
						'min-h-[100vh] px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8 xl:pb-24 3xl:px-10 3xl:pt-0.5'
					}
				>
					{children}
				</main>
			</div>
		</ThemeContextProvider>
	);
}
