module.exports = {
	extends: [require.resolve('@image-generator/config/eslint/base.js')],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: './tsconfig.json'
	}
};