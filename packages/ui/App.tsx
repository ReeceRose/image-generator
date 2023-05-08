import { BaseClient } from '@image-generator/client/';
import { GenerateImageSize, Image } from '@image-generator/client/types';
import { useState } from 'react';
import Button from './Components/Button';
import PrivateInput from './Components/Forms/PrivateInput';
import Textarea from './Components/Forms/TextArea';
import Spinner from './Components/Spinner';
import Layout from './Layouts';

type AppProps = {
	client: BaseClient;
};

function App({ client }: AppProps) {
	const [loading, setLoading] = useState<boolean>(false);
	const [imageCount, setImageCount] = useState<number>(1);
	const [openAIKey, setOpenAIKey] = useState<string>('');
	const [prompt, setPrompt] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [images, setImages] = useState<Image[]>();

	const incrementImageCount = () => {
		let currentCount = imageCount;
		currentCount += 1;
		setImageCount(Math.min(currentCount, 5));
	};

	const decrementImageCount = () => {
		let currentCount = imageCount;
		currentCount -= 1;
		setImageCount(Math.max(1, currentCount));
	};

	async function submitImage() {
		setLoading(true);
		const response = await client.generate_image({
			apiKey: openAIKey,
			imageCount: imageCount,
			prompt: prompt,
			size: GenerateImageSize.Medium
		});
		if (response.error) {
			setError(response.error.message);
		} else {
			setImages(response.data);
		}
		setLoading(false);
	}

	return (
		<Layout>
			{loading && <Spinner />}
			<section className="mx-auto w-full max-w-[1160px] text-sm">
				<h2 className="mb-5 text-lg font-medium dark:text-gray-100 sm:mb-6 lg:mb-7 xl:text-xl">
					Generate new images
				</h2>

				<div className="mb-6 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-6 xs:pb-8">
					<h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">
						Number of Images
					</h3>
					<p className="mb-5 leading-[1.8] dark:text-gray-300">
						The number of images you wish to generate.
					</p>
					<div className="flex w-full flex-row items-center md:w-1/2">
						<Button clickHandler={decrementImageCount}>-</Button>
						<p className="mx-4">{imageCount}</p>
						<Button clickHandler={incrementImageCount}>+</Button>
					</div>
				</div>
				<div className="mb-6 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-6 xs:pb-8">
					<h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">API Key</h3>
					<p className="mb-5 leading-[1.8] dark:text-gray-300">
						Open AI API key. Generate{' '}
						<a
							href="https://platform.openai.com/account/api-keys"
							rel="noreferrer"
							target="_blank"
							className="text-brand"
						>
							here
						</a>
						.
					</p>
					<div className="flex w-full flex-row items-center">
						<PrivateInput setMessage={(key) => setOpenAIKey(key)} placeholder="API Key" />
					</div>
				</div>
				<div className="mb-6 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-6 xs:pb-8">
					<h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">Description</h3>
					<Textarea
						setMessage={(prompt) => setPrompt(prompt)}
						placeholder="Propmpt of the image you would like to generate."
					/>
				</div>
				<div className="mt-6">
					<Button clickHandler={submitImage}>Generate photos</Button>
				</div>

				{error && (
					<div className="mb-6 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-6">
						<p className="leading-[1.8] text-red-500">{error}</p>
					</div>
				)}

				{images && (
					<div className="grid grid-cols-12 gap-5">
						<h2 className="col-span-12 mt-5 text-lg font-medium dark:text-gray-100 xl:text-xl">
							Generated images
						</h2>
						{images.map((image) => (
							<div className="col-span-12 h-1/2 rounded-md md:col-span-4" key={image.url}>
								<img src={image.url} alt="Generated image" />
							</div>
						))}
					</div>
				)}
			</section>
		</Layout>
	);
}

export default App;
