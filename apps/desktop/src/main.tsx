import { TuariClient } from '@image-generator/client/tuari';
import App from '@image-generator/ui/App';
import '@image-generator/ui/style/syles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

const client = new TuariClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App client={client} />
	</React.StrictMode>
);
