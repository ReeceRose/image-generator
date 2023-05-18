import { HTTPClient } from '@image-generator/client/http';
import App from '@image-generator/ui/App';
import '@image-generator/ui/style/syles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

const client = new HTTPClient(
	import.meta.env.DEV
		? 'http://127.0.0.1:8000'
		: 'https://7egdvek4c2.execute-api.us-east-1.amazonaws.com/'
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App client={client} />
	</React.StrictMode>
);
