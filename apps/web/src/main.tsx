import { HTTPClient } from '@image-generator/client/http';
import App from '@image-generator/ui/App';
import '@image-generator/ui/style/syles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

const client = new HTTPClient('https://7go95vmux6.execute-api.us-east-1.amazonaws.com/production');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App client={client} />
	</React.StrictMode>
);
