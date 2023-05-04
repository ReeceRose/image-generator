import { BaseClient } from '@image-generator/client/';
import { useEffect } from 'react';
import Button from './Components/Button';
import Input from './Components/Forms/Input';
import Textarea from './Components/Forms/TextArea';
import Layout from './Layouts';

type AppProps = {
	client: BaseClient;
};

function App({ client }: AppProps) {
	async function submitImage() {}

	return (
		<Layout>
			<section className="mx-auto w-full max-w-[1160px] text-sm">
				<h2 className="mb-5 text-lg font-medium dark:text-gray-100 sm:mb-6 lg:mb-7 xl:text-xl">
					Generate new images
				</h2>
				<div className="mb-6 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-6 xs:pb-8">
					<h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">Description</h3>
					<p className="mb-5 leading-[1.8] dark:text-gray-300">Description</p>
					<Textarea placeholder="Add the proposal details here" inputClassName="md:h-32 xl:h-36" />
				</div>
				<div className="mt-6">
					<Button clickHandler={submitImage}>Generate photos</Button>
				</div>
			</section>
		</Layout>
	);
}

export default App;
