import { mergeConfig } from 'vite';

import baseConfig from '../../packages/config/vite.config';

export default mergeConfig(baseConfig, {
	server: {
		port: 3001
	},
});