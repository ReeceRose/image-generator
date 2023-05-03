import { BaseClient } from '@image-generator/client/';
import { useState } from 'react';
import { Button } from './Components/Button';

type AppProps = {
	client: BaseClient;
};

function App({ client }: AppProps) {
	const [message, setMessage] = useState('');
	const [name, setName] = useState('');

	const getMessage = async () => {
		const response = await client.hello(name);
		setMessage(response);
	};

	return (
		<>
			<div className="flex flex-col">
				<div>
					<label htmlFor="name">Name: </label>
					<input
						type="text"
						name="name"
						id="name"
						className="bg-gray-200"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<Button onClick={getMessage} />
				<div>{message}</div>
			</div>
		</>
	);
}

export default App;
