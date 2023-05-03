import { BaseClient } from '@image-generator/client/';

type AppProps = {
	client: BaseClient;
};

function App({ client }: AppProps) {
	return (
		<>
			<div className="flex flex-col"></div>
		</>
	);
}

export default App;
