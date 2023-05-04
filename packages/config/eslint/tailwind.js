const path = require('node:path');
module.exports = {
	extends: [require.resolve('./base.js'), 'plugin:tailwindcss/recommended'],
	rules: {
		'tailwindcss/no-custom-classname': 'off',
		'tailwindcss/classnames-order': 'off'
	},
	settings: {
		tailwindcss: {
			callees: ['classnames', 'clsx', 'ctl', 'cva', 'tw', 'twStyle'],
			tags: ['tw', 'twStyle']
		}
	}
};
